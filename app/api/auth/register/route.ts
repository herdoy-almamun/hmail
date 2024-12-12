import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validateUser = (user: User) => {
  const joiPassword = Joi.extend(joiPasswordExtendCore);
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(255).required(),
    lastName: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(2)
      .minOfUppercase(2)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .doesNotInclude(["password"])
      .required(),
  });

  return schema.validate(user);
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const { error } = validateUser(data);

    if (error)
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: error.details[0].message,
        },
        { status: 400 }
      );

    const { firstName, lastName, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        image: newUser.image,
      },
      process.env.JWT_SECRET_KEY!
    );

    return NextResponse.json({ success: true, token }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};
