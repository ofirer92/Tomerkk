/**
 * Single source of truth for business details.
 * Update here and every button, link, and schema entry on the site follows.
 */

export const BUSINESS = {
  name: "Kabriz Garage Doors",
  shortName: "Kabriz",
  owner: "Tomer",
  tagline: "Sales · Installation · Repair",
  /** E.164 format — used for tel: links, WhatsApp, and structured data */
  phoneE164: "+14433814876",
  /** WhatsApp wants digits only, no plus sign */
  phoneWhatsApp: "14433814876",
  /** Human-friendly display */
  phoneDisplay: "(443) 381-4876",
  email: "Kabrizgaragedoors@gmail.com",
  hours: "Sun–Fri · 8am – 6pm",
  hoursSchema: "Su-Fr 08:00-18:00",
  serviceArea: "Maryland",
} as const;

import { BASE_PATH } from "@/lib/base-path";

export { BASE_PATH };

/** Prefix a public asset with the base path (next/image does not do this). */
export function asset(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const IMAGES = {
  logo: asset("/images/logo.png"),
  og: asset("/images/og.jpg"),
  tomerTruck: asset("/images/tomer-truck.jpg"),
  springInstall: asset("/images/work-spring-install.jpg"),
} as const;

const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Tomer, I need help with my garage door. Can you give me a free estimate?";

const DEFAULT_EMAIL_SUBJECT = "Garage door estimate request";

export const CONTACT_LINKS = {
  phone: `tel:${BUSINESS.phoneE164}`,
  sms: `sms:${BUSINESS.phoneE164}`,
  whatsapp: whatsappLink(DEFAULT_WHATSAPP_MESSAGE),
  email: emailLink(DEFAULT_EMAIL_SUBJECT, ""),
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.phoneWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailLink(subject: string, body: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${BUSINESS.email}${query ? `?${query}` : ""}`;
}
