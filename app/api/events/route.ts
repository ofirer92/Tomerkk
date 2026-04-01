import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { EventType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = EventType.safeParse(body.event_type);

    if (!eventType.success) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    await supabase.from("site_events").insert({
      event_type: eventType.data,
      customer_id: body.customer_id ?? null,
      metadata: body.metadata ?? null,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
