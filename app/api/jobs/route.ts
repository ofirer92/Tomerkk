import { NextRequest, NextResponse } from "next/server";
import { CreateJobSchema } from "@/types";
import { createAdminClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = CreateJobSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = await createAdminClient();
    const { data: job, error } = await supabase
      .from("jobs")
      .insert(parsed.data)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }

    return NextResponse.json({ job }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
