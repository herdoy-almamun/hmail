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
