import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const pageSize = url.searchParams.get("pageSize");
    const user = url.searchParams.get("user");
    const subject = url.searchParams.get("subject");

    const mailCount = await prisma.mail.count({
      where: {
        receiver: user!,
        subject: {
          startsWith: subject ? subject : undefined,
          mode: "insensitive",
        },
      },
    });
    const setPage = parseInt(page!) | 1;
    const setPageSize = parseInt(pageSize!);

    const mails = await prisma.mail.findMany({
      where: {
        receiver: user ? user : undefined,
        subject: {
          startsWith: subject ? subject : undefined,
          mode: "insensitive",
        },
      },
      skip: (setPage - 1) * setPageSize,
      take: setPageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      { data: mails, count: mailCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went worn" },
      { status: 400 }
    );
  }
};
