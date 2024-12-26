import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const pageSize = Number(url.searchParams.get("pageSize"));
    const user = url.searchParams.get("user");
    const subject = url.searchParams.get("subject") || "";

    // Validate query parameters
    if (!page || !pageSize || !user || page <= 0 || pageSize <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid query parameters" },
        { status: 400 }
      );
    }

    // Fetch total mail count
    const mailCount = await prisma.mail.count({
      where: {
        receiver: user,
        subject: {
          startsWith: subject,
          mode: "insensitive",
        },
      },
    });

    // Fetch paginated mails
    const mails = await prisma.mail.findMany({
      where: {
        receiver: user,
        subject: {
          startsWith: subject,
          mode: "insensitive",
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return response
    return NextResponse.json(
      { success: true, data: mails, count: mailCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching mails:", error.message);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
