import { createAdminClient } from "@/lib/supabase/server";

export async function generateCustomerCode(): Promise<string> {
  const supabase = await createAdminClient();

  for (let attempts = 0; attempts < 10; attempts++) {
    const num = Math.floor(1000 + Math.random() * 9000);
    const code = `TOMER-${num}`;

    const { data } = await supabase
      .from("customers")
      .select("id")
      .eq("code", code)
      .single();

    if (!data) return code; // No collision
  }

  throw new Error("Failed to generate unique customer code after 10 attempts");
}
