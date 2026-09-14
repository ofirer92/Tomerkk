import { Shield, Clock, DollarSign, User } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const reasons = [
  {
    icon: User,
    title: "You deal with me, not a call center",
    description:
      "I answer my own phone. I show up myself. No subcontractors, no surprises.",
  },
  {
    icon: DollarSign,
    title: "Upfront pricing, always",
    description:
      "I give you the full price before I touch anything. No hidden fees, no upsells.",
  },
  {
    icon: Clock,
    title: "Same-day availability",
    description:
      "Stuck outside your garage? I prioritize emergency calls and offer same-day service.",
  },
  {
    icon: Shield,
    title: "Licensed & insured in Maryland",
    description:
      "Full liability coverage and a Maryland contractor license — you're protected.",
  },
];

export default function WhyMeSection() {
  return (
    <section
      id="why-me"
      className="relative bg-primary text-white py-20 px-4 overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-grid-light opacity-50" aria-hidden="true" />
      <div
        className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Independent & accountable"
          title="Why choose Tomer?"
          subtitle="I started my own business because I believe in doing things right — every single time."
          centered
          light
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex gap-5 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-3xl p-6 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                <r.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-1.5">{r.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {r.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
