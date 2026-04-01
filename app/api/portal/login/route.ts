import { NextRequest, NextResponse } from "next/server";
import { PortalLoginSchema } from "@/types";
import { createAdminClient } from "@/lib/supabase/server";
import {
  signCustomerToken,
  COOKIE_NAME,
  MAX_AGE,
} from "@/lib/auth/customer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = PortalLoginSchema.safeParse({
      code: (body.code as string)?.trim().toUpperCase(),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Code must be in format TOMER-XXXX" },
        { status: 400 }
      );
    }

    const supabase = await createAdminClient();

    const { data: customer } = await supabase
      .from("customers")
      .select("id, full_name, is_vip, vip_discount_pct")
      .eq("code", parsed.data.code)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: "Code not recognized. Please check with Tomer." },
        { status: 401 }
      );
    }

    const token = await signCustomerToken({
      customerId: customer.id,
      code: parsed.data.code,
    });

    // Log portal login event
    await supabase.from("site_events").insert({
      event_type: "portal_login",
      customer_id: customer.id,
    });

    const response = NextResponse.json({
      success: true,
      name: customer.full_name,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("Portal login error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
