import AdminRtlWrapper from "@/components/admin/AdminRtlWrapper";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <AdminRtlWrapper>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </AdminRtlWrapper>
  );
}
