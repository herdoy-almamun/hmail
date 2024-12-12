import prisma from "@/prisma/client";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

interface Mail {
  sender: String;
  receiver: String;
  subject: String;
  body?: String;
  image?: String;
}

const validateMail = (mail: Mail) => {
  const schema = Joi.object({
    sender: Joi.string().email().required(),
    receiver: Joi.string().email().required(),
    subject: Joi.string().min(1).max(255),
    body: Joi.string(),
    image: Joi.string().uri(),
  });
  return schema.validate(mail);
};

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, message: "Please provide valid email" },
        { status: 400 }
      );
    const mail = await prisma.mail.findUnique({
      where: { id },
    });
    return NextResponse.json(mail, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const { error } = validateMail(data);
    if (error)
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      );

    const { sender, receiver, subject, body, image } = data;

    const validateReceiver = await prisma.user.findUnique({
      where: { email: sender },
    });
    if (!validateReceiver)
      return NextResponse.json(
        { success: false, message: "Invalid Receiver" },
        { status: 401 }
      );

    const newMail = await prisma.mail.create({
      data: { sender, receiver, subject, body, image },
    });

    return NextResponse.json(newMail, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};
