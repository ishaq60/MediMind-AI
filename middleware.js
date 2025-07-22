import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });
console.log(token)

  const url = request.nextUrl.pathname;

  // Must be authenticated for admin or doctor dashboard
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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
