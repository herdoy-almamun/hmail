import { NextRequest, NextResponse } from "next/server";

export const GET = (requset: NextRequest) => {
  const token = requset.cookies.get("token");
  if (token) return NextResponse.json(token.value);
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};
