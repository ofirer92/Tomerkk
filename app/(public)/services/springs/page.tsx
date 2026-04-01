import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Garage Door Spring Repair Maryland",
  description:
    "Broken garage door spring? Tomer provides fast, safe spring repair and replacement across Maryland. Free estimate. Same-day available.",
  keywords: [
    "garage door spring repair Maryland",
    "broken garage door spring",
    "torsion spring replacement",
    "garage door spring Baltimore",
  ],
};

export default function SpringsPage() {
  return (
    <ServicePageTemplate
      serviceName="Spring Repair & Replacement"
      tagline="The #1 garage door problem — and the most dangerous to ignore."
      analogy={`Think of a garage door spring like a staple that bends back and forth thousands of times. Eventually it fatigues and snaps — often with a loud bang. The spring stores all the energy that makes your heavy door lift easily. Without it, the opener (or your back) has to do all that work alone.`}
      description="Garage door springs have a lifespan of about 7–10 years or 10,000 cycles. When one breaks, the door becomes nearly impossible to open manually and puts massive strain on your opener motor. This is a repair that needs a professional — the spring tension involved can cause serious injury."
      icon={Settings2}
      warningSignsItems={[
        "A loud bang from the garage (the spring snapping)",
        "A visible gap in the coil of the torsion spring above the door",
        "Cables lying loose on the floor or hanging slack",
        "The door feels extremely heavy when you try to lift it manually",
        "The opener strains, moves the door a few inches, then reverses",
      ]}
      dangersItems={[
        "A broken spring places the full weight of the door (150–300 lbs) on the opener motor, burning it out",
        "Attempting to wind or replace springs without proper tools can result in severe injury — springs store enormous energy",
        "One broken spring usually means the other is near the end of its life too — we'll check both",
        "A door with a bad spring can fall unexpectedly and damage your car or injure someone",
      ]}
    />
  );
}
