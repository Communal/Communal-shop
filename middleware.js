import { NextResponse } from "next/server";

// Define protected routes (add more as needed)
const protectedRoutes = ["/profile", "/cart", "/purchase-history", "/transaction-history"];

export function middleware(request) {
  // Check if the current path is protected
  const { pathname } = request.nextUrl;

  // Only run for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Check for token in cookies (if you use cookies)
    const token = request.cookies.get("token")?.value;

    // If you use localStorage for token, you can't access it here (middleware runs on server)
    // So, for localStorage-based auth, you must use client-side checks instead.

    if (!token) {
      // Redirect to login page
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: ["/profile", "(auth)/cart", "/purchase-history", "/transaction-history"],
};