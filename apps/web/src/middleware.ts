import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    console.log("[Middleware] Protected route accessed:", req.nextUrl.pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user has a valid token
        const isAuthenticated = !!token;
        const isAuthPage =
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/signup");

        // If user is authenticated and trying to access auth pages, redirect to dashboard
        if (isAuthenticated && isAuthPage) {
          return false; // This will trigger a redirect
        }

        // If user is not authenticated and trying to access protected pages
        if (!isAuthenticated && !isAuthPage) {
          return false; // This will redirect to login
        }

        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    // Auth routes (for redirect logic)
    "/login",
    "/signup",
  ],
};
