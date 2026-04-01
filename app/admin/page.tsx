import { createAdminClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";
import { BarChart2, QrCode, Wrench, MessageSquare } from "lucide-react";

const SERVICE_LABELS: Record<string, string> = {
  spring: "קפיצים",
  opener: "מנוע",
  "off-track": "אוף-טראק",
  installation: "התקנה",
  other: "אחר",
};

export default async function AdminDashboard() {
  const supabase = await createAdminClient();
  const monthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toISOString();

  // Inquiries this month
  const { count: inquiriesCount } = await supabase
    .from("site_events")
    .select("id", { count: "exact", head: true })
    .eq("event_type", "estimate_request")
    .gte("created_at", monthStart);

  // QR scans this month
  const { count: qrCount } = await supabase
    .from("site_events")
    .select("id", { count: "exact", head: true })
    .eq("event_type", "qr_scan")
    .gte("created_at", monthStart);

  // Most common repair this month
  const { data: jobsThisMonth } = await supabase
    .from("jobs")
    .select("service_type")
    .gte("created_at", monthStart);

  let topRepair = "—";
  if (jobsThisMonth && jobsThisMonth.length > 0) {
    const counts: Record<string, number> = {};
    jobsThisMonth.forEach((j) => {
      counts[j.service_type] = (counts[j.service_type] ?? 0) + 1;
    });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (top) topRepair = SERVICE_LABELS[top[0]] ?? top[0];
  }

  // Total customers
  const { count: customerCount } = await supabase
    .from("customers")
    .select("id", { count: "exact", head: true });

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">לוח בקרה</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="פניות החודש"
          value={inquiriesCount ?? 0}
          subtitle="בקשות הערכת מחיר"
          icon={MessageSquare}
        />
        <StatsCard
          title="סריקות QR החודש"
          value={qrCount ?? 0}
          subtitle="מדבקות על מנועים"
          icon={QrCode}
        />
        <StatsCard
          title="תיקון נפוץ"
          value={topRepair}
          subtitle="החודש הנוכחי"
          icon={Wrench}
        />
        <StatsCard
          title="סה״כ לקוחות"
          value={customerCount ?? 0}
          subtitle="מאז ההתחלה"
          icon={BarChart2}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-500 text-sm text-center">
          ברוך הבא, תומר! בחר קטגוריה מהתפריט הצידי.
        </p>
      </div>
    </div>
  );
}
