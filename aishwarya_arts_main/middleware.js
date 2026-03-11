import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 1. If they are trying to access Admin pages
  if (path.startsWith("/admin")) {
    
    // 🚩 ALLOW the login page to always load
    if (path === "/admin") {
      return NextResponse.next();
    }

    // 🚩 PROTECT other admin routes
    if (!token || token.role !== "admin") {
      // Instead of letting next-auth handle it, we manually redirect
      // This prevents the infinite 'callbackUrl' stacking
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 2. Only run middleware on these paths
export const config = {
  matcher: ["/admin/:path*"],
};