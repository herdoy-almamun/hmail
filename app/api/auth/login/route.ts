import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface LoginData {
  email: string;
  password: string;
}

const validateLoginData = (data: LoginData) => {
  const joiPassword = Joi.extend(joiPasswordExtendCore);
  const schema = Joi.object({
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

  return schema.validate(data);
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const { error } = validateLoginData(data);

    if (error)
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: error.details[0].message,
        },
        { status: 400 }
      );

    const { email, password } = data;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
      process.env.JWT_SECRET_KEY!
    );

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    );
  }
};
