"use client";

import { Phone, Mail } from "lucide-react";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

/**
 * Always-visible quick contact:
 *  - Mobile: thumb-reachable bottom bar (Call / WhatsApp / Email)
 *  - Desktop: floating WhatsApp bubble in the corner
 */
export default function FloatingContact() {
  return (
    <>
      {/* Mobile bottom bar */}
      <nav
        aria-label="Quick contact"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-6px_24px_rgb(15_39_64_/_0.12)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-3 gap-2 p-2">
          <a
            href={CONTACT_LINKS.phone}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-accent text-white py-2 font-semibold text-xs active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
            Call
          </a>
          <a
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-whatsapp text-white py-2 font-semibold text-xs active:scale-95 transition-transform"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href={CONTACT_LINKS.email}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary text-white py-2 font-semibold text-xs active:scale-95 transition-transform"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
        </div>
      </nav>

      {/* Desktop floating WhatsApp bubble */}
      <a
        href={CONTACT_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${BUSINESS.owner} on WhatsApp`}
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full pl-4 pr-5 py-3 shadow-xl animate-pulse-ring transition-colors group"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="font-semibold text-sm">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
}
