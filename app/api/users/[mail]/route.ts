import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ mail: string }> }
) {
  try {
    // Await the params to ensure they are resolved
    const { mail } = await context.params;

    const user = await prisma.user.findUnique({
      where: {
        email: mail,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
