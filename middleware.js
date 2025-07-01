import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });

  console.log("Middleware Token:", token); // for debugging

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboar", "/dashboar/:path*"], // apply middleware to dashboard routes
};
