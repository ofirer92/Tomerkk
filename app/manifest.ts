import type { MetadataRoute } from "next";
import { BASE_PATH, BUSINESS } from "@/lib/contact";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.shortName,
    description: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c2d12",
    icons: [
      { src: `${BASE_PATH}/icon.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${BASE_PATH}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: `WhatsApp ${BUSINESS.owner}`, url: `https://wa.me/${BUSINESS.phoneWhatsApp}` },
      { name: `Call ${BUSINESS.owner}`, url: `tel:${BUSINESS.phoneE164}` },
    ],
  };
}
