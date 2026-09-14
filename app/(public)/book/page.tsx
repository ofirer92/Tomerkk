import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, Clock, ShieldCheck, MessageSquareText } from "lucide-react";
import EstimateForm from "@/components/shared/EstimateForm";
import QrScanTracker from "@/components/shared/QrScanTracker";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Free Estimate",
  description:
    "Request a free garage door estimate from Tomer. Maryland garage door repair and installation — fast response guaranteed.",
};

const quickLinks = [
  {
    label: "WhatsApp",
    hint: "Fastest reply",
    href: CONTACT_LINKS.whatsapp,
    icon: WhatsAppIcon,
    classes: "bg-whatsapp text-white",
    external: true,
  },
  {
    label: BUSINESS.phoneDisplay,
    hint: "Call Tomer",
    href: CONTACT_LINKS.phone,
    icon: Phone,
    classes: "bg-accent text-white",
    external: false,
  },
  {
    label: "Email",
    hint: BUSINESS.email,
    href: CONTACT_LINKS.email,
    icon: Mail,
    classes: "bg-primary text-white",
    external: false,
  },
];

export default function BookPage() {
  return (
    <>
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-50" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange mb-3">
            Free estimate
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Tell me about your door
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Send the details below and {BUSINESS.owner} will get back to you
            quickly — usually within a couple of hours.
          </p>
        </div>
      </section>

      <div className="relative z-10 max-w-5xl mx-auto px-4 -mt-10 md:-mt-14 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Suspense>
          <QrScanTracker />
        </Suspense>

        {/* Form */}
        <div className="lg:col-span-7 bg-white border border-gray-200/80 rounded-3xl shadow-xl shadow-primary/10 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-xl bg-orange-soft text-orange flex items-center justify-center">
              <MessageSquareText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-bold text-primary text-lg leading-tight">
                Estimate request
              </h2>
              <p className="text-xs text-muted">Takes about a minute</p>
            </div>
          </div>
          <EstimateForm source="website" />
        </div>

        {/* Side panel */}
        <aside className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="bg-white border border-gray-200/80 rounded-3xl shadow-lg shadow-primary/5 p-6">
            <h2 className="font-bold text-primary mb-1">Skip the form</h2>
            <p className="text-sm text-muted mb-4">
              Reach {BUSINESS.owner} directly — one tap on mobile.
            </p>
            <div className="space-y-2.5">
              {quickLinks.map((q) => (
                <a
                  key={q.label}
                  href={q.href}
                  target={q.external ? "_blank" : undefined}
                  rel={q.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-transform active:scale-[0.98] hover:brightness-110 ${q.classes}`}
                >
                  <q.icon className="w-5 h-5" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm leading-tight">
                      {q.label}
                    </span>
                    <span className="block text-xs opacity-80 truncate">{q.hint}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-gray-200/80 rounded-3xl p-6 text-sm space-y-3">
            <p className="flex items-center gap-3 text-primary">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              {BUSINESS.hours} · Emergency service available
            </p>
            <p className="flex items-center gap-3 text-primary">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
              Licensed &amp; insured · Serving all of {BUSINESS.serviceArea}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
