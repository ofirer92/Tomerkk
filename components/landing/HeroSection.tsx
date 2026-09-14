import { Phone, Star, ShieldCheck, Clock, BadgeDollarSign, Mail } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";

const stats = [
  { value: "5+", label: "Years in the trade" },
  { value: "Same-day", label: "Service available" },
  { value: "100%", label: "Upfront pricing" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-light opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -left-32 w-[420px] h-[420px] rounded-full bg-primary-light/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-16 md:pt-24 md:pb-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Copy */}
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-sm animate-fade-up">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span>Licensed &amp; insured · Serving all of Maryland</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight animate-fade-up stagger-100">
            Garage door stuck?
            <br />
            <span className="text-accent">Tomer fixes it today.</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl animate-fade-up stagger-200">
            Broken springs, dead openers, doors off the track — I&apos;m the
            technician who answers the phone <em>and</em> shows up. Honest
            pricing before I touch anything, no call center, no runaround.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up stagger-300">
            <CTAButton href={CONTACT_LINKS.whatsapp} variant="whatsapp" size="lg">
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Tomer
            </CTAButton>
            <CTAButton href={CONTACT_LINKS.phone} variant="primary" size="lg">
              <Phone className="w-5 h-5" />
              Call {BUSINESS.phoneDisplay}
            </CTAButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70 animate-fade-up stagger-400">
            <a
              href={CONTACT_LINKS.email}
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4 text-accent" />
              {BUSINESS.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              {BUSINESS.hours}
            </span>
          </div>
        </div>

        {/* Visual card */}
        <div className="lg:col-span-5 animate-scale-in stagger-200">
          <div className="relative mx-auto max-w-sm">
            {/* Stylized garage door illustration */}
            <div className="rounded-3xl bg-gradient-to-b from-primary-light to-primary-dark border border-white/10 shadow-2xl p-5 animate-float">
              <div className="rounded-2xl bg-primary-dark/70 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-white/50">
                    Door status
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-300">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Fixed &amp; balanced
                  </span>
                </div>
                {/* Door panels */}
                <div className="space-y-1.5" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-9 rounded-md bg-gradient-to-r from-white/15 via-white/10 to-white/15 border border-white/10 flex items-center px-3 gap-2"
                    >
                      {i === 1 && (
                        <>
                          <span className="w-8 h-4 rounded-sm bg-white/20" />
                          <span className="w-8 h-4 rounded-sm bg-white/20" />
                          <span className="w-8 h-4 rounded-sm bg-white/20" />
                          <span className="w-8 h-4 rounded-sm bg-white/20" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust rows */}
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-center gap-3 text-white/85">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                  Maryland licensed &amp; fully insured
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <BadgeDollarSign className="w-5 h-5 text-accent flex-shrink-0" />
                  Free estimate, price locked before work starts
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                  Same-day and emergency appointments
                </li>
              </ul>
            </div>

            {/* Floating stat chip */}
            <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white text-primary rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                <Star className="w-5 h-5 text-accent fill-accent" />
              </div>
              <div className="leading-tight">
                <p className="font-bold text-sm">Owner-operated</p>
                <p className="text-xs text-muted">Tomer does every job himself</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-white/10 bg-primary-dark/40">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-3 divide-x divide-white/10 text-center">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <p className="text-xl md:text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-white/55">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
