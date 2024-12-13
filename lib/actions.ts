"use server";

import prisma from "@/prisma/client";

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
