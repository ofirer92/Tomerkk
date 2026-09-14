import { Tag, Sparkles } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappLink } from "@/lib/contact";

const promotions = [
  {
    title: "Free Safety Inspection",
    description:
      "With any repair booking, get a complete garage door safety inspection at no extra charge.",
    badge: "Free add-on",
    highlight: false,
  },
  {
    title: "$25 Off Spring Replacement",
    description:
      "Mention this offer when you reach out and get $25 off any spring repair or replacement.",
    badge: "Limited time",
    highlight: true,
  },
  {
    title: "Senior & Military Discount",
    description:
      "10% discount for seniors and active / veteran military — just show your ID.",
    badge: "Always active",
    highlight: false,
  },
];

export default function PromotionsSection() {
  return (
    <section id="promotions" className="py-20 px-4 bg-surface scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Offers"
          title="Current promotions"
          subtitle="Honest pricing, plus a little extra when you book with Kabriz."
          centered
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((p) => (
            <div
              key={p.title}
              className={`relative rounded-3xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
                p.highlight
                  ? "bg-primary text-white shadow-xl shadow-primary/20 md:-mt-3 md:mb-3"
                  : "bg-white border border-gray-200/80 shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-full px-3 py-1 ${
                    p.highlight
                      ? "bg-gold text-primary-dark"
                      : "bg-accent-soft text-accent border border-red-100"
                  }`}
                >
                  {p.highlight ? (
                    <Sparkles className="w-3 h-3" />
                  ) : (
                    <Tag className="w-3 h-3" />
                  )}
                  {p.badge}
                </span>
              </div>
              <h3
                className={`font-bold text-xl ${p.highlight ? "text-white" : "text-primary"}`}
              >
                {p.title}
              </h3>
              <p
                className={`text-sm leading-relaxed flex-1 ${
                  p.highlight ? "text-white/75" : "text-muted"
                }`}
              >
                {p.description}
              </p>
              <CTAButton
                href={whatsappLink(
                  `Hi Tomer, I'd like to book the "${p.title}" offer. When are you available?`
                )}
                variant={p.highlight ? "primary" : "whatsapp"}
                size="sm"
                className="mt-1 self-start"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Claim on WhatsApp
              </CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
