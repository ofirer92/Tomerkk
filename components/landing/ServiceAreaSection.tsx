import { MapPin } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export const SERVICE_AREAS = [
  "Baltimore County",
  "Baltimore City",
  "Anne Arundel County",
  "Howard County",
  "Montgomery County",
  "Prince George's County",
  "Carroll County",
  "Harford County",
  "Frederick County",
];

export default function ServiceAreaSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <SectionHeading
            eyebrow="Where I work"
            title="Serving all of Maryland"
            subtitle="Kabriz is based in the Baltimore area and on the road every day. If you're in Maryland, I can get to you — usually the same day."
          />
        </div>
        <div className="md:col-span-7">
          <ul className="flex flex-wrap gap-2.5">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-2 bg-surface border border-gray-200/80 rounded-full px-4 py-2 text-sm font-medium text-primary"
              >
                <MapPin className="w-4 h-4 text-accent" />
                {area}
              </li>
            ))}
            <li className="inline-flex items-center gap-2 bg-gold-soft border border-gold/30 rounded-full px-4 py-2 text-sm font-medium text-primary">
              + surrounding areas
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
