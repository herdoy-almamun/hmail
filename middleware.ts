import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Read token from cookies
  const { pathname } = req.nextUrl;

  // Allow public files (e.g., images, JS, CSS, etc.)
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from login/register pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users to the login page
  if (!token && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|public).*)"], // Adjust matchers as needed
};
