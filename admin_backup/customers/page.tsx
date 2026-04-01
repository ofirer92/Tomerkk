import { createAdminClient } from "@/lib/supabase/server";
import type { Customer } from "@/types";
import Link from "next/link";
import { Plus, User } from "lucide-react";
import { format } from "date-fns";

export default async function CustomersPage() {
  const supabase = await createAdminClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Customer[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">לקוחות</h1>
        <Link
          href="/admin/customers/new"
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          לקוח חדש
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {!customers || customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <User className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p>אין לקוחות עדיין. הוסף לקוח ראשון.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-right px-4 py-3">שם</th>
                <th className="text-right px-4 py-3">קוד</th>
                <th className="text-right px-4 py-3">טלפון</th>
                <th className="text-right px-4 py-3">VIP</th>
                <th className="text-right px-4 py-3">נוצר</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {c.full_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600">
                    {c.code}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {c.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {c.is_vip ? (
                      <span className="text-amber-600 font-semibold text-xs">
                        ✦ VIP {c.vip_discount_pct}%
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {format(new Date(c.created_at), "dd/MM/yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/customers/${c.id}`}
                      className="text-accent hover:underline text-xs font-medium"
                    >
                      צפה
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
