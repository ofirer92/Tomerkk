import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/contact";

export const dynamic = "force-static";

const BASE = "/tomerkk";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.shortName,
    description: BUSINESS.tagline,
    start_url: `${BASE}/`,
    scope: `${BASE}/`,
    display: "standalone",
    background_color: "#0f2740",
    theme_color: "#0f2740",
    icons: [
      {
        src: `${BASE}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "WhatsApp Tomer",
        url: `https://wa.me/${BUSINESS.phoneWhatsApp}`,
      },
      {
        name: "Call Tomer",
        url: `tel:${BUSINESS.phoneE164}`,
      },
    ],
  };
}
