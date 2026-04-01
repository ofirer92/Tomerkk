import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth/customer";

export async function POST() {
  const response = NextResponse.redirect(
    new URL("/portal/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  );
  response.cookies.delete(COOKIE_NAME);
  return response;
}
