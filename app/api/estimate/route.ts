import { NextRequest, NextResponse } from "next/server";
import { EstimateFormSchema } from "@/types";
import { createAdminClient } from "@/lib/supabase/server";
import { notifyNewEstimate } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = EstimateFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const supabase = await createAdminClient();

    // Insert appointment
    const { error: dbError } = await supabase.from("appointments").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      address: data.address,
      preferred_date: data.preferred_date || null,
      preferred_time: data.preferred_time || null,
      service_interest: data.service_interest || null,
      source: data.source ?? "website",
      status: "new",
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
    }

    // Log site event
    await supabase.from("site_events").insert({
      event_type: "estimate_request",
      metadata: { source: data.source },
    });

    // Notify Tomer by email (non-blocking)
    notifyNewEstimate(data).catch((e) =>
      console.error("Email notification failed:", e)
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error("Estimate route error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
