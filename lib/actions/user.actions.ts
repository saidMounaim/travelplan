"use server";

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
