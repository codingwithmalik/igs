import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // <-- async
  const adminToken = req.cookies.get("adminToken")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    try {
      if (!adminToken) throw new Error("No token");

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(adminToken, secret); // <-- await the verification

      console.log("Token verified");
      return NextResponse.next();
    } catch (err) {
      console.log("Middleware error:", err);
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next(); // <-- allow non-admin routes
}

export const config = {
  matcher: ["/admin/:path*"], // protect all admin paths
};
