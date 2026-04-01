import { NextRequest, NextResponse } from "next/server";
import { verifyCustomerToken, COOKIE_NAME } from "@/lib/auth/customer";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Customer portal protection ────────────────────────────────────────────
  if (pathname.startsWith("/portal") && !pathname.startsWith("/portal/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }

    const payload = await verifyCustomerToken(token);
    if (!payload) {
      const response = NextResponse.redirect(
        new URL("/portal/login", request.url)
      );
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // ── Admin protection ─────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const response = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
