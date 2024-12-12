import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    if (!email)
      return NextResponse.json(
        { success: false, message: "Please provide valid email" },
        { status: 400 }
      );
    const users = await prisma.user.findMany({
      where: { email: { startsWith: email } },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};
