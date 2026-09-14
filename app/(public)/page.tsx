import type { Metadata } from "next";
import { Settings2, Zap, AlertTriangle, Phone, Mail } from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import ServicePreviewCard from "@/components/landing/ServicePreviewCard";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyMeSection from "@/components/landing/WhyMeSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import ServiceAreaSection from "@/components/landing/ServiceAreaSection";
import WorkGallerySection from "@/components/landing/WorkGallerySection";
import SectionHeading from "@/components/shared/SectionHeading";
import CTAButton from "@/components/shared/CTAButton";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";
import { SITE_URL as SITE_URL_DEFAULT } from "@/lib/base-path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_DEFAULT;

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  alternateName: "Kabriz Garage Doors — Sales, Installation, Repair",
  description:
    "Friendly, licensed garage door sales, installation and repair in Maryland. Springs, openers, off-track repair.",
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/og.jpg`,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  url: SITE_URL,
  areaServed: [
    "Baltimore County, MD",
    "Baltimore City, MD",
    "Anne Arundel County, MD",
    "Howard County, MD",
    "Montgomery County, MD",
    "Prince George's County, MD",
    "Carroll County, MD",
    "Harford County, MD",
    "Frederick County, MD",
  ],
  serviceType: [
    "Garage Door Spring Repair",
    "Garage Door Opener Installation",
    "Garage Door Off-Track Repair",
    "Garage Door Installation",
  ],
  openingHours: BUSINESS.hoursSchema,
  priceRange: "$$",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

const services = [
  {
    icon: Settings2,
    title: "Spring Repair",
    description:
      "A broken spring is the #1 garage door problem. If your door won't open or feels incredibly heavy, this is likely why.",
    href: "/services/springs",
    urgent: true,
  },
  {
    icon: Zap,
    title: "Opener Installation",
    description:
      "Noisy, slow, or non-responsive opener? I'll diagnose and replace with the right unit for your door.",
    href: "/services/openers",
  },
  {
    icon: AlertTriangle,
    title: "Off-Track Door",
    description:
      "Door jumped off the tracks? This is urgent — do not force it. I'll realign it safely before damage gets worse.",
    href: "/services/off-track",
    urgent: true,
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      {/* Services preview */}
      <section id="services" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="What I fix"
            title="Most common garage door issues"
            subtitle="If your garage door is giving you trouble, it's probably one of these. Tap one to see what's happening and what to do next."
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServicePreviewCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <WorkGallerySection />
      <HowItWorksSection />
      <WhyMeSection />
      <PromotionsSection />
      <ServiceAreaSection />

      {/* Final CTA */}
      <section className="px-4 pb-20">
        <div className="relative max-w-5xl mx-auto bg-primary text-white rounded-[2rem] overflow-hidden px-6 py-12 md:px-14 md:py-16 text-center">
          <div className="absolute inset-0 bg-grid-light opacity-40" aria-hidden="true" />
          <div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Let's fix your garage door
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              WhatsApp, call, or email — whichever is easiest for you.
              I&apos;ll get back to you quickly with a straight answer and a
              fair price.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton href={CONTACT_LINKS.whatsapp} variant="whatsapp" size="lg">
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </CTAButton>
              <CTAButton href={CONTACT_LINKS.phone} variant="primary" size="lg">
                <Phone className="w-5 h-5" />
                {BUSINESS.phoneDisplay}
              </CTAButton>
              <CTAButton href={CONTACT_LINKS.email} variant="secondary" size="lg">
                <Mail className="w-5 h-5" />
                Email
              </CTAButton>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Prefer a form?{" "}
              <a href="/book" className="text-white underline underline-offset-4 hover:text-accent">
                Request a free estimate
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
