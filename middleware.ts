import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Read token from cookies
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|public).*)"], // Adjust matchers as needed
};
