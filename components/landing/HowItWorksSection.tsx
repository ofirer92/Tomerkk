import { MessageCircle, CalendarCheck, Wrench } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "Tell me what's wrong",
    description:
      "WhatsApp, call, or email. Send a quick photo or video of the door — it helps me bring the right parts.",
  },
  {
    icon: CalendarCheck,
    title: "Get a straight price",
    description:
      "I'll confirm a time that works for you and give you a clear estimate before any work begins.",
  },
  {
    icon: Wrench,
    title: "Fixed — usually same day",
    description:
      "I show up with the parts, do the repair, test the balance and safety sensors, and clean up.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-surface scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Simple process"
          title="How it works"
          subtitle="Three steps from a stuck door to a working one. No forms to fight with, no waiting on hold."
          centered
        />

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative bg-white rounded-3xl border border-gray-200/80 p-7 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-12 rounded-2xl bg-gold-soft text-gold flex items-center justify-center">
                  <s.icon className="w-6 h-6" />
                </span>
                <span className="text-4xl font-bold text-primary/10 leading-none">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
