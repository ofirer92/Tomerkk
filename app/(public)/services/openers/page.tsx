import type { Metadata } from "next";
import { Zap } from "lucide-react";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Garage Door Opener Repair & Installation Maryland",
  description:
    "Garage door opener not working? Tomer installs and repairs openers across Maryland. Free estimate, all major brands.",
  keywords: [
    "garage door opener installation Maryland",
    "garage door opener repair Baltimore",
    "LiftMaster installation Maryland",
    "smart garage door opener",
  ],
};

export default function OpenersPage() {
  return (
    <ServicePageTemplate
      serviceName="Opener Repair & Installation"
      tagline="The brain of your garage door system — when it fails, everything stops."
      analogy={`Your opener is like the engine of a car. It doesn't matter how good the rest of the system is if the engine won't start. A worn-out opener makes every trip to the garage a frustration — and eventually leaves you stranded.`}
      description="Modern garage door openers are more than just motors. They handle safety reversals, Wi-Fi connectivity, battery backup, and security rolling codes. Getting the right opener for your specific door size and weight is critical — the wrong unit will either fail early or be unnecessarily loud and slow. I'll match the right opener to your setup and install it correctly."
      icon={Zap}
      warningSignsItems={[
        "The opener hums but the door doesn't move (stripped drive gear)",
        "The remote or keypad stopped working and new batteries didn't help",
        "The door reverses right after touching the ground",
        "Grinding or rattling noises during operation",
        "The opener works sometimes but not others (intermittent failure)",
        "You want to add Wi-Fi / smart home control to your garage",
      ]}
      dangersItems={[
        "An opener with a faulty safety reversal can close on a child or pet — this is a critical safety hazard",
        "Running an undersized opener burns out the motor and voids the warranty",
        "Incorrect installation can misalign the drive rail, causing the door to bind or fall off track",
        "Old openers lack rolling-code security — a fixed-code opener can be cloned in seconds with cheap tools",
      ]}
    />
  );
}
