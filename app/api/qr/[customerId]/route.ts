import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { generateQrDataUrl } from "@/lib/qr";
import type { Customer } from "@/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { customerId } = await params;
  const supabase = await createAdminClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .single<Customer>();

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  let targetUrl: string;
  if (customer.qr_target === "portal") {
    targetUrl = `${SITE_URL}/portal/login?code=${encodeURIComponent(customer.code)}`;
  } else {
    targetUrl = `${SITE_URL}/book?ref=qr&cid=${customer.id}`;
  }

  const dataUrl = await generateQrDataUrl(targetUrl);

  return NextResponse.json({
    dataUrl,
    targetUrl,
    customerName: customer.full_name,
    code: customer.code,
  });
}
