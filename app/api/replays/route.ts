import prisma from "@/prisma/client";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

interface Reply {
  userId: string;
  mailId: string;
  reply?: string;
  image?: string;
}

const validateReply = (reply: Reply) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    mailId: Joi.string().required(),
    reply: Joi.string().max(3000),
    image: Joi.string().uri(),
  });
  return schema.validate(reply);
};

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
    const { error } = validateReply(data);
    if (error)
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      );
    const { userId, mailId, reply, image } = data;
    await prisma.reply.create({ data: { userId, mailId, reply, image } });
    return NextResponse.json(
      { success: true, message: "Mail Created" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};
