import Image from "next/image";
import { Phone, Star, ShieldCheck, Clock, BadgeDollarSign, Mail, Heart } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import Logo from "@/components/shared/Logo";
import { BUSINESS, CONTACT_LINKS, IMAGES } from "@/lib/contact";

const stats = [
  { value: "5+", label: "Years in the trade" },
  { value: "Same-day", label: "Service available" },
  { value: "100%", label: "Upfront pricing" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-light opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -left-32 w-[420px] h-[420px] rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Copy */}
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-sm animate-fade-up">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span>Licensed &amp; insured · Serving all of Maryland</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight animate-fade-up stagger-100">
            Hi, I&apos;m {BUSINESS.owner}.
            <br />
            <span className="text-gold">Let&apos;s get your garage door working again.</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl animate-fade-up stagger-200">
            Broken spring, dead opener, door off the track? Send me a quick
            message or a photo and I&apos;ll tell you what&apos;s going on and
            what it costs. No call center, no pressure, no surprises.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up stagger-300">
            <CTAButton href={CONTACT_LINKS.whatsapp} variant="whatsapp" size="lg">
              <WhatsAppIcon className="w-5 h-5" />
              Message on WhatsApp
            </CTAButton>
            <CTAButton href={CONTACT_LINKS.phone} variant="primary" size="lg">
              <Phone className="w-5 h-5" />
              Call {BUSINESS.phoneDisplay}
            </CTAButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70 animate-fade-up stagger-400">
            <a
              href={CONTACT_LINKS.email}
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4 text-gold" />
              {BUSINESS.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              {BUSINESS.hours}
            </span>
          </div>
        </div>

        {/* Photo card */}
        <div className="lg:col-span-5 animate-scale-in stagger-200">
          <div className="relative mx-auto max-w-sm">
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/15 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <Image
                src={IMAGES.tomerTruck}
                alt={`${BUSINESS.owner} of ${BUSINESS.name} with a truck loaded with garage door parts`}
                width={1050}
                height={1400}
                priority
                className="w-full h-[380px] sm:h-[440px] object-cover object-[35%_20%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/90 to-transparent px-5 pt-16 pb-14">
                <p className="text-white font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent fill-accent" />
                  {BUSINESS.owner}, owner &amp; technician
                </p>
                <p className="text-white/70 text-sm">
                  Truck stocked with springs, openers and parts, every day.
                </p>
              </div>
            </div>

            {/* Logo badge */}
            <div className="absolute -top-6 -right-4 sm:-right-8 animate-float">
              <Logo size={108} className="shadow-xl ring-4 ring-primary" />
            </div>

            {/* Trust chip */}
            <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white text-primary rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-gold" />
              </div>
              <div className="leading-tight">
                <p className="font-bold text-sm">Licensed &amp; insured</p>
                <p className="text-xs text-muted">Maryland contractor</p>
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
              <p className="text-xl md:text-2xl font-extrabold text-white">{s.value}</p>
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
