import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 401 }
      );
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};
