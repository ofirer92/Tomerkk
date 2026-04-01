import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyCustomerToken, COOKIE_NAME } from "@/lib/auth/customer";
import { createAdminClient } from "@/lib/supabase/server";
import type { Customer, Job } from "@/types";
import JobStatusBadge from "@/components/portal/JobStatusBadge";
import { format } from "date-fns";
import { LogOut, Star, Wrench } from "lucide-react";
import Link from "next/link";

export default async function PortalPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) redirect("/portal/login");

  const payload = await verifyCustomerToken(token);
  if (!payload) redirect("/portal/login");

  const supabase = await createAdminClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", payload.customerId)
    .single<Customer>();

  if (!customer) redirect("/portal/login");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("customer_id", customer.id)
    .order("created_at", { ascending: false })
    .returns<Job[]>();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header bar */}
      <header className="bg-primary text-white px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-accent" />
            <span className="font-bold">Tomer&apos;s Garage · My Portal</span>
          </div>
          <form action="/api/portal/logout" method="POST">
            <button className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-xl font-bold text-primary mb-1">
            Hi, {customer.full_name}!
          </h1>
          <p className="text-gray-500 text-sm">
            Your customer code:{" "}
            <span className="font-mono font-semibold text-primary">
              {customer.code}
            </span>
          </p>
        </div>

        {/* VIP discount */}
        {customer.is_vip && customer.vip_discount_pct > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 text-sm">
                VIP Customer — {customer.vip_discount_pct}% discount active
              </p>
              <p className="text-amber-700 text-xs mt-0.5">
                As a returning customer, you automatically get{" "}
                {customer.vip_discount_pct}% off your next service. Mention this
                when booking.
              </p>
            </div>
          </div>
        )}

        {/* Job history */}
        <div>
          <h2 className="text-lg font-bold text-primary mb-3">
            Your Service History
          </h2>

          {!jobs || jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
              <Wrench className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No jobs yet</p>
              <p className="text-sm mt-1">
                Your service history will appear here.
              </p>
              <Link
                href="/book"
                className="mt-4 inline-block text-accent font-semibold text-sm hover:underline"
              >
                Request an estimate →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {job.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {format(new Date(job.created_at), "MMMM d, yyyy")} ·{" "}
                        <span className="capitalize">
                          {job.service_type.replace("-", " ")}
                        </span>
                      </p>
                    </div>
                    <JobStatusBadge status={job.status} />
                  </div>

                  {job.cost != null && (
                    <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                      Total:{" "}
                      <span className="font-semibold">
                        ${job.cost.toFixed(2)}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
