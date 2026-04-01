import { createAdminClient } from "@/lib/supabase/server";
import type { Customer, Job } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star, QrCode } from "lucide-react";
import { format } from "date-fns";
import JobStatusUpdater from "@/components/admin/JobStatusUpdater";
import AddJobForm from "@/components/admin/AddJobForm";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createAdminClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single<Customer>();

  if (!customer) notFound();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("customer_id", id)
    .order("created_at", { ascending: false })
    .returns<Job[]>();

  return (
    <div className="max-w-3xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin/customers" className="hover:text-primary transition-colors">
          לקוחות
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">{customer.full_name}</span>
      </div>

      {/* Customer card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-primary">{customer.full_name}</h1>
              {customer.is_vip && (
                <span className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  VIP {customer.vip_discount_pct}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 font-mono mt-1">{customer.code}</p>
          </div>
          <Link
            href={`/admin/qr?customer=${customer.id}`}
            className="flex items-center gap-2 text-accent hover:text-accent-hover text-sm font-medium transition-colors"
          >
            <QrCode className="w-4 h-4" />
            צפה ב-QR
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          {customer.phone && <p>📞 {customer.phone}</p>}
          {customer.email && <p>✉️ {customer.email}</p>}
          {customer.address && (
            <p className="col-span-2">📍 {customer.address}</p>
          )}
          {customer.notes && (
            <div className="col-span-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              📝 {customer.notes}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          נוצר: {format(new Date(customer.created_at), "dd/MM/yyyy HH:mm")}
        </p>
      </div>

      {/* Jobs */}
      <div>
        <h2 className="text-lg font-bold text-primary mb-3">עבודות</h2>

        {jobs && jobs.length > 0 && (
          <div className="space-y-3 mb-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{job.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {format(new Date(job.created_at), "dd/MM/yyyy")} ·{" "}
                    <span className="capitalize">{job.service_type}</span>
                    {job.cost != null && ` · $${job.cost.toFixed(2)}`}
                  </p>
                </div>
                <JobStatusUpdater jobId={job.id} currentStatus={job.status} />
              </div>
            ))}
          </div>
        )}

        <AddJobForm customerId={customer.id} />
      </div>
    </div>
  );
}
