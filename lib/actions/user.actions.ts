"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";

interface createUserProps {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

interface updateUserProps {
  firstName?: string;
  lastName?: string;
  image?: string;
}

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

export async function getCurrentUser(retryCount = 0) {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      if (retryCount < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return getCurrentUser(retryCount + 1);
      }
      throw new Error("User not found after maximum retries");
    }
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
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

export async function updateUser(userDetails: updateUserProps, userId: string) {
  try {
    const userToUpdate = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { clerkId: userToUpdate.clerkId },
      data: userDetails,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error to update user:", error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const userToDelete = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await prisma.user.delete({
      where: { clerkId: userToDelete.clerkId },
    });
  } catch (error) {
    console.error("Error to delete user:", error);
  }
}

export async function updateCredit(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.credit && user.credit > 0) {
      const updatedUser = await prisma.user.update({
        where: { clerkId: userId },
        data: { credit: user.credit - 1 },
      });
      return updatedUser;
    } else {
      throw new Error("User does not have enough credits to decrement");
    }
  } catch (error) {
    console.error("Error to update credit:", error);
  }
}
