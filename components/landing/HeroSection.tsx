import Link from "next/link";
import { Phone, Star } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";

export default function HeroSection() {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1 space-y-6">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span>5+ Years · Maryland Licensed</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Hey, I&apos;m{" "}
            <span className="text-accent">Tomer</span>.
            <br />
            Your garage door guy in Maryland.
          </h1>

          <p className="text-white/80 text-lg leading-relaxed max-w-lg">
            I went independent so I could give you what the big companies
            don&apos;t: honest pricing, real accountability, and same-day
            service — without the runaround.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <CTAButton href="/book" variant="primary">
              Get a Free Estimate
            </CTAButton>
            <CTAButton href="/#promotions" variant="secondary">
              Current Promotions
            </CTAButton>
          </div>

          {/* Quick contact */}
          <a
            href="tel:+12407000000"
            className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            Call now: (240) 700-0000
          </a>
        </div>

        {/* Hero image placeholder */}
        <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent shadow-2xl bg-primary-light flex items-center justify-center">
          {/* Replace src with Tomer's actual photo */}
          <div className="text-center text-white/60 text-sm p-6">
            <div className="text-6xl mb-2">👷</div>
            <p>Photo coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
