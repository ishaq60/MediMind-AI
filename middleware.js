import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  // ✅ Correct way to pass request and secret
  const token = await getToken({ req: request, secret });

  // ❌ Remove console.log in production
  if (process.env.NODE_ENV !== "production") {
    console.log("Token:", token);
  }

  const url = request.nextUrl.pathname;

  // ✅ Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Role-based access control
  if (url.startsWith("/dashboard/admin") && token.type !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (url.startsWith("/dashboard/doctor") && token.type !== "doctor") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin/:path*", "/dashboard/doctor/:path*"],
};
