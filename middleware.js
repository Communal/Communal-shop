import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // ✅ Protect /admin/* and /api/admin/*
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    try {
      const token = request.cookies.get("token")?.value;
      if (!token) throw new Error("No token found");

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== "ADMIN") throw new Error("Insufficient permissions");

      return NextResponse.next();
    } catch (error) {
      console.error("❌ Middleware error:", error.message);

      // If it's an API call, return JSON error instead of redirect
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // If it's a page, redirect to admin login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Apply only to admin pages & admin APIs
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
