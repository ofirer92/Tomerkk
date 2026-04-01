import { NextRequest, NextResponse } from "next/server";
import { CreateCustomerSchema } from "@/types";
import { createAdminClient } from "@/lib/supabase/server";
import { generateCustomerCode } from "@/lib/codes";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  // Verify admin session
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = CreateCustomerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const code = await generateCustomerCode();
    const supabase = await createAdminClient();

    const { data: customer, error } = await supabase
      .from("customers")
      .insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone ?? null,
        email: parsed.data.email || null,
        address: parsed.data.address ?? null,
        notes: parsed.data.notes ?? null,
        is_vip: parsed.data.is_vip ?? false,
        vip_discount_pct: parsed.data.vip_discount_pct ?? 0,
        qr_target: parsed.data.qr_target ?? "estimate",
        code,
      })
      .select()
      .single();

    if (error) {
      console.error("Customer insert error:", error);
      return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
    }

    // Log event
    await supabase.from("site_events").insert({
      event_type: "customer_created",
      customer_id: customer.id,
    });

    return NextResponse.json({ customer }, { status: 201 });
  } catch (e) {
    console.error("Create customer error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createAdminClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ customers });
}
