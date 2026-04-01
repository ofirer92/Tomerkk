import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Garage Door Off Track Repair Maryland",
  description:
    "Garage door off track? Don't force it — call Tomer. Emergency off-track repair across Maryland. Safe, fast, and done right.",
  keywords: [
    "garage door off track repair Maryland",
    "garage door jumped off track",
    "emergency garage door repair",
    "garage door cable snapped",
  ],
};

export default function OffTrackPage() {
  return (
    <ServicePageTemplate
      serviceName="Off-Track Door Repair"
      tagline="Stop. Don't force it. This is the most dangerous garage door situation."
      analogy={`An off-track door is like a train derailment — it happened fast, and forcing it back without knowing what you're doing makes everything worse. The rollers have left their channels, and the cables may be twisted. Every inch you force it risks bending the tracks, snapping a cable, or sending a 200-pound panel crashing down.`}
      description="Off-track doors happen suddenly — a car bumps the door, a roller wears out, or a cable snaps. In every case, the fix requires careful realignment of the tracks, inspection of all rollers, and cable tension adjustment. This is a job that genuinely requires professional tools and experience to do safely."
      icon={AlertTriangle}
      warningSignsItems={[
        "The door is visibly crooked or one side is higher than the other",
        "You hear scraping or grinding as the door moves",
        "The door stopped mid-travel and won't move further",
        "You can see a roller sitting outside its track channel",
        "One or both lift cables are hanging slack or appear twisted",
      ]}
      dangersItems={[
        "Forcing an off-track door can permanently bend the steel tracks — turning a $150 repair into a $600 one",
        "A snapped cable under tension can whip back with enough force to cause serious injury",
        "If only one side is off-track, the door is structurally unbalanced and can collapse",
        "Running the opener on an off-track door will burn out the motor and may strip the drive",
        "This is a true emergency — leaving it overnight risks the door falling and damaging your car",
      ]}
    />
  );
}
