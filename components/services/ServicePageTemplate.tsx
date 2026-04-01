import { AlertTriangle, CheckCircle2, Phone } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import type { LucideIcon } from "lucide-react";

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
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="flex items-start gap-4 mb-8">
        <div className="bg-primary/10 rounded-2xl p-4 flex-shrink-0">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {serviceName}
          </h1>
          <p className="text-accent font-semibold text-lg">{tagline}</p>
        </div>
      </div>

      {/* Analogy & description */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <p className="text-gray-700 leading-relaxed italic mb-3">
          &ldquo;{analogy}&rdquo;
        </p>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Warning signs */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          How to recognize the problem
        </h2>
        <ul className="space-y-3">
          {warningSignsItems.map((sign) => (
            <li key={sign} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-gray-700">{sign}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dangers */}
      <div className="bg-danger-bg border border-red-200 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-danger-text mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger-text" />
          Why you shouldn&apos;t wait (or DIY)
        </h2>
        <ul className="space-y-3">
          {dangersItems.map((danger) => (
            <li key={danger} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-danger-text mt-2 flex-shrink-0" />
              <span className="text-danger-text">{danger}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-primary rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">
          Ready to get this fixed today?
        </h2>
        <p className="text-white/75 mb-6">
          Free estimate, honest pricing, same-day service available.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton href="/book" variant="primary">
            Schedule Free Estimate
          </CTAButton>
          <a
            href="tel:+12407000000"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold rounded-lg px-6 py-3 text-sm hover:bg-white hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call (240) 700-0000
          </a>
        </div>
      </div>
    </div>
  );
}
