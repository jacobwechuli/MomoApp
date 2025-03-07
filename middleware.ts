import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protected routes
  const protectedRoutes = ["/dashboard", "/appointments", "/payments"];

  // Redirect unauthenticated users to login
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// ✅ Correct way to export middleware
export const config = {
  matcher: ["/dashboard/:path*", "/appointments/:path*", "/payments/:path*"],
};
