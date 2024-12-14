"use server";

import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function countSentMail(userMail: string) {
  const sentMailsCount = await prisma.mail.count({
    where: { sender: userMail },
  });
  return sentMailsCount;
}

export async function countInboxMail(userMail: string) {
  const sentMailsCount = await prisma.mail.count({
    where: { receiver: userMail },
  });
  return sentMailsCount;
}

import { cookies } from "next/headers";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) return { success: false, message: "Unauthorized" };
    const user = jwt.decode(token?.value as string) as User;
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error };
  }
}
