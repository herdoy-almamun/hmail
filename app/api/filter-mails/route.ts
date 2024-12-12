import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get("pageNumber")!) || 1;
    const receiver = url.searchParams.get("receiver");
    const sender = url.searchParams.get("sender");
    const subject = url.searchParams.get("subject");

    const mails = await prisma.mail.findMany({
      where: {
        receiver: receiver ? receiver : undefined,
        sender: sender ? sender : undefined,
        subject: {
          startsWith: subject ? subject : undefined,
          mode: "insensitive",
        },
      },
      skip: (pageNumber - 1) * 5,
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(mails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Please provide valid mail id" },
      { status: 400 }
    );
  }
};
