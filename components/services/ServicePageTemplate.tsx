import Link from "next/link";
import { AlertTriangle, CheckCircle2, Phone, ChevronRight, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { BUSINESS, CONTACT_LINKS, whatsappLink } from "@/lib/contact";

interface ServicePageTemplateProps {
  serviceName: string;
  tagline: string;
  analogy: string;
  description: string;
  warningSignsItems: string[];
  dangersItems: string[];
  icon: LucideIcon;
}

export default function ServicePageTemplate({
  serviceName,
  tagline,
  analogy,
  description,
  warningSignsItems,
  dangersItems,
  icon: Icon,
}: ServicePageTemplateProps) {
  const waHref = whatsappLink(
    `Hi ${BUSINESS.owner}, I think I need help with: ${serviceName}. Can you give me a free estimate?`
  );

  return (
    <>
      {/* Hero band */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-50" aria-hidden="true" />
        <div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-gold/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 pt-10 pb-14 md:pt-16 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90">{serviceName}</span>
          </nav>

          <div className="flex items-start gap-5 animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-orange flex items-center justify-center shadow-lg shadow-orange/30 flex-shrink-0">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                {serviceName}
              </h1>
              <p className="text-gold font-semibold text-lg md:text-xl">{tagline}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up stagger-200">
            <CTAButton href={waHref} variant="whatsapp" size="lg">
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp a photo of the door
            </CTAButton>
            <CTAButton href={CONTACT_LINKS.phone} variant="primary" size="lg">
              <Phone className="w-5 h-5" />
              Call {BUSINESS.phoneDisplay}
            </CTAButton>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-10">
        {/* Analogy & description */}
        <div className="bg-surface border border-gray-200/80 rounded-3xl p-6 md:p-8">
          <p className="text-primary text-lg leading-relaxed italic mb-4 border-l-4 border-orange pl-4">
            &ldquo;{analogy}&rdquo;
          </p>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Warning signs */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-7 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </span>
              How to recognize it
            </h2>
            <ul className="space-y-3">
              {warningSignsItems.map((sign) => (
                <li key={sign} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dangers */}
          <div className="bg-danger-bg border border-red-200 rounded-3xl p-6 md:p-7">
            <h2 className="text-xl font-bold text-danger-text mb-5 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-danger-text" />
              </span>
              Why not to wait (or DIY)
            </h2>
            <ul className="space-y-3">
              {dangersItems.map((danger) => (
                <li key={danger} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-danger-text mt-2 flex-shrink-0" />
                  <span className="text-red-900 text-sm leading-relaxed">{danger}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="relative bg-primary rounded-3xl p-8 md:p-10 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-light opacity-40" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Ready to get this fixed today?
            </h2>
            <p className="text-white/75 mb-7">
              Free estimate, honest pricing, same-day service available.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton href={waHref} variant="whatsapp">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </CTAButton>
              <CTAButton href={CONTACT_LINKS.phone} variant="primary">
                <Phone className="w-4 h-4" />
                Call {BUSINESS.phoneDisplay}
              </CTAButton>
              <CTAButton href={CONTACT_LINKS.email} variant="secondary">
                <Mail className="w-4 h-4" />
                Email
              </CTAButton>
            </div>
            <Link
              href="/book"
              className="inline-block mt-5 text-sm text-white/70 hover:text-white underline underline-offset-4"
            >
              Or fill out the estimate form
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
