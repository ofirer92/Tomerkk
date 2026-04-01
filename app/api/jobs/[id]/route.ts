import { NextRequest, NextResponse } from "next/server";
import { UpdateJobStatusSchema } from "@/types";
import { createAdminClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabaseAuth = await createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = UpdateJobStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const updateData: Record<string, unknown> = {
      status: parsed.data.status,
      updated_at: new Date().toISOString(),
    };

    if (parsed.data.status === "job_completed") {
      updateData.completed_at = new Date().toISOString();
    }

    const { data: job, error } = await supabase
      .from("jobs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }

    return NextResponse.json({ job });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
