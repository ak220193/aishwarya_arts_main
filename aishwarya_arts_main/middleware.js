import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // 1. If it's the Admin UI and not an admin, send to login
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname, method } = req.nextUrl;

        // ✅ 2. EXPLICIT ALLOW: If it's a GET request to the products API, return true (Authorized)
        if (pathname.startsWith("/api/admin/products") && method === "GET") {
          return true;
        }

        // 🔒 3. RESTRICT: Everything else in the matcher needs a token
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// 4. Ensure the matcher captures the exact API path
export const config = { 
  matcher: [
    "/admin/:path*", 
   
  ] 
};