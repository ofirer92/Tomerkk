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
    <section id="why-me" className="bg-primary text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Why choose Tomer?"
          subtitle="I started my own business because I believe in doing things right — every single time."
          centered
          light
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex gap-4 bg-white/10 rounded-2xl p-5"
            >
              <div className="flex-shrink-0">
                <r.icon className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{r.title}</h3>
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
