import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    // Fix: Changed 'nexturl' to 'nextUrl'
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    // If trying to access admin pages without the admin role, redirect to login
    if (isAdminPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  },
  {
    callbacks: {
      // Authorized if a token exists
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin",
    },
  }
);

export const config = { 
  matcher: ["/admin/:path*", "/api/admin/:path*"] 
};