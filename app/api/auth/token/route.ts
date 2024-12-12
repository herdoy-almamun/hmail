import { NextRequest, NextResponse } from "next/server";

export const GET = (requset: NextRequest) => {
  try {
    const token = requset.cookies.get("token");
    if (token) return NextResponse.json(token.value);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Oops! Something Went Wrong." },
      { status: 500 }
    );
  }
};
