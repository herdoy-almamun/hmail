import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, message: "Please provide valid mail id" },
        { status: 400 }
      );
    const replays = await prisma.reply.findMany({
      where: { mailId: id },
    });
    return NextResponse.json(replays, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Please provide valid mail id" },
      { status: 400 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const { userId, mailId, reply, image } = data;
    await prisma.reply.create({ data: { userId, mailId, reply, image } });
    return NextResponse.json(
      { success: true, message: "Mail Created" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went worn" },
      { status: 400 }
    );
  }
};
