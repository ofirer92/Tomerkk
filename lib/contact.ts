/**
 * Single source of truth for business contact details.
 * Update here and every button, link, and schema entry on the site follows.
 */

export const BUSINESS = {
  name: "Tomer's Garage Door Services",
  shortName: "Tomer's Garage",
  owner: "Tomer",
  tagline: "Garage door repair & installation across Maryland",
  /** E.164 format — used for tel: links, WhatsApp, and structured data */
  phoneE164: "+14433814876",
  /** WhatsApp wants digits only, no plus sign */
  phoneWhatsApp: "14433814876",
  /** Human-friendly display */
  phoneDisplay: "(443) 381-4876",
  email: "Kabrizgaragedoors@gmail.com",
  hours: "Mon–Sat · 7am – 7pm",
  hoursSchema: "Mo-Sa 07:00-19:00",
  serviceArea: "Maryland",
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
