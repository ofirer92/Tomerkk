import { Tag } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";

const promotions = [
  {
    title: "Free Safety Inspection",
    description:
      "With any repair booking, get a complete garage door safety inspection at no extra charge.",
    badge: "Free Add-on",
  },
  {
    title: "$25 Off Spring Replacement",
    description:
      "Mention this offer when you call and get $25 off any spring repair or replacement.",
    badge: "Limited Time",
  },
  {
    title: "Senior & Military Discount",
    description:
      "10% discount for seniors and active / veteran military — just show your ID.",
    badge: "Always Active",
  },
];

export default function PromotionsSection() {
  return (
    <section id="promotions" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Current Promotions"
          subtitle="Honest pricing, plus a little extra when you book with Tomer."
          centered
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold text-accent bg-orange-50 border border-orange-200 rounded-full px-3 py-0.5">
                  {p.badge}
                </span>
              </div>
              <h3 className="font-bold text-primary text-lg">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {p.description}
              </p>
              <CTAButton
                href="/book"
                variant="primary"
                className="mt-2 !py-2 !px-4 !text-sm"
              >
                Book Now
              </CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
