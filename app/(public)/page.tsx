import type { Metadata } from "next";
import { Settings2, Zap, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomersgarage.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tomer's Garage Door Services",
  description:
    "Professional garage door repair and installation in Maryland. Springs, openers, off-track repair.",
  telephone: "+12407000000",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomersgarage.com",
  areaServed: [
    "Montgomery County, MD",
    "Prince George's County, MD",
    "Howard County, MD",
    "Frederick County, MD",
    "Anne Arundel County, MD",
    "Baltimore County, MD",
  ],
  serviceType: [
    "Garage Door Spring Repair",
    "Garage Door Opener Installation",
    "Garage Door Off-Track Repair",
    "Garage Door Installation",
  ],
  openingHours: "Mo-Sa 07:00-19:00",
  priceRange: "$$",
};
import HeroSection from "@/components/landing/HeroSection";
import ServicePreviewCard from "@/components/landing/ServicePreviewCard";
import WhyMeSection from "@/components/landing/WhyMeSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import SectionHeading from "@/components/shared/SectionHeading";
import CTAButton from "@/components/shared/CTAButton";

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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Most Common Issues"
            subtitle="If your garage door is giving you trouble, chances are it's one of these."
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s) => (
              <ServicePreviewCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <WhyMeSection />
      <PromotionsSection />

      {/* Final CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            Ready to fix your garage door?
          </h2>
          <p className="text-gray-600 mb-6">
            It only takes a minute. I&apos;ll get back to you fast and give you
            a straight answer.
          </p>
          <CTAButton href="/book" variant="primary" className="!text-base !px-8 !py-4">
            Get My Free Estimate
          </CTAButton>
        </div>
      </section>
    </>
  );
}
