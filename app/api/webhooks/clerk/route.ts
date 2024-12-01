import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  const client = await clerkClient();

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || "",
      firstName: first_name || "",
      lastName: last_name || "",
      image: image_url,
    };

    const newUser = await prisma.user.create({
      data: user,
    });

    if (newUser) {
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id,
        },
      });
    }

    return NextResponse.json({ message: "OK", user: newUser });
  }

  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const userToUpdate = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    const user = {
      firstName: first_name || "",
      lastName: last_name || "",
      username: username || "",
      image: image_url,
    };

    const updatedUser = await prisma.user.update({
      where: { clerkId: userToUpdate.clerkId },
      data: user,
    });

    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const userToDelete = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await prisma.user.delete({
      where: { clerkId: userToDelete.clerkId },
    });

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  return new Response("", { status: 200 });
}