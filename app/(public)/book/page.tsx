import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import EstimateForm from "@/components/shared/EstimateForm";
import QrScanTracker from "@/components/shared/QrScanTracker";

export const metadata: Metadata = {
  title: "Free Estimate",
  description:
    "Request a free garage door estimate from Tomer. Maryland garage door repair and installation — fast response guaranteed.",
};

export default function BookPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Suspense>
        <QrScanTracker />
      </Suspense>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Get Your Free Estimate
        </h1>
        <p className="text-gray-600">
          Fill out the form below and Tomer will get back to you quickly —
          usually within a couple of hours.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
        <EstimateForm source="website" />
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Prefer to call?{" "}
        <a
          href="tel:+12407000000"
          className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
        >
          <Phone className="w-3 h-3" />
          (240) 700-0000
        </a>
      </div>
    </div>
  );
}
