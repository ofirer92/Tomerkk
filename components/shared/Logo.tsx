import Image from "next/image";
import { BUSINESS, IMAGES } from "@/lib/contact";

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

/** The round Kabriz badge. Sits on any background thanks to its white disc. */
export default function Logo({ size = 48, className = "", priority }: LogoProps) {
  return (
    <Image
      src={IMAGES.logo}
      alt={`${BUSINESS.name} logo`}
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full bg-white ${className}`}
    />
  );
}
