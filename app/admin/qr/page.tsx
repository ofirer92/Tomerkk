import { createAdminClient } from "@/lib/supabase/server";
import type { Customer } from "@/types";
import QRCodeDisplay from "@/components/admin/QRCodeDisplay";

export default async function QRPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer: selectedId } = await searchParams;
  const supabase = await createAdminClient();

  const { data: customers } = await supabase
    .from("customers")
    .select("id, full_name, code, qr_target")
    .order("full_name")
    .returns<Pick<Customer, "id" | "full_name" | "code" | "qr_target">[]>();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary mb-6">סריקות QR</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer selector */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3 text-sm">בחר לקוח</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {customers?.map((c) => (
              <a
                key={c.id}
                href={`/admin/qr?customer=${c.id}`}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  selectedId === c.id
                    ? "bg-accent text-white font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span>{c.full_name}</span>
                <span
                  className={`font-mono text-xs ${
                    selectedId === c.id ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {c.code}
                </span>
              </a>
            ))}

            {(!customers || customers.length === 0) && (
              <p className="text-gray-400 text-sm text-center py-4">
                אין לקוחות עדיין
              </p>
            )}
          </div>
        </div>

        {/* QR display */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {selectedId ? (
            <QRCodeDisplay customerId={selectedId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-48 text-gray-400 text-sm">
              <div className="text-4xl mb-3">📱</div>
              <p>בחר לקוח מהרשימה כדי לצפות ב-QR שלו</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
