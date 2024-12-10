import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ mail: string }> }
) {
  try {
    // Await the params to ensure they are resolved
    const { mail } = await context.params;

    const mails = await prisma.mail.findMany({
      where: {
        OR: [{ sender: mail }, { receiver: mail }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(mails, { status: 200 });
  } catch (error) {
    console.error("Error fetching mails:", error);
    return NextResponse.json(
      { error: "Failed to fetch mails" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ mail: string }> }
) {
  try {
    // Await the params to ensure they are resolved
    const { mail } = await context.params;

    const isExist = await prisma.mail.findUnique({ where: { id: mail } });
    if (!isExist)
      return NextResponse.json({ error: "Mail not fount" }, { status: 401 });
    await prisma.mail.update({
      where: {
        id: mail,
      },
      data: { isReaded: isExist.isReaded ? false : true },
    });

    return NextResponse.json({ success: true, message: "Ok" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching mails:", error);
    return NextResponse.json(
      { error: "Failed to fetch mails" },
      { status: 500 }
    );
  }
}
