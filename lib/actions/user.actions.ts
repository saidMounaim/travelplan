"use server";

import prisma from "../prisma";

interface createUserProps {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
}

export async function createUser(userDetails: createUserProps) {
  try {
    const newUser = await prisma.user.create({
      data: userDetails,
    });
    return newUser;
  } catch (error) {
    console.error("Error to create user:", error);
  }
}
