"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, Mail, X, Wrench, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const STORAGE_KEY = "tg-splash-seen";
/** Custom DOM event any component can dispatch to reopen the splash. */
export const OPEN_CONTACT_EVENT = "tg:open-contact";

export function openContactSplash() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_CONTACT_EVENT));
  }
}

const channels = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    hint: "Fastest reply · send a photo of the door",
    href: CONTACT_LINKS.whatsapp,
    icon: WhatsAppIcon,
    classes:
      "bg-whatsapp hover:bg-whatsapp-hover text-white shadow-lg shadow-whatsapp/30",
    external: true,
  },
  {
    key: "phone",
    label: `Call ${BUSINESS.phoneDisplay}`,
    hint: "Talk to Tomer directly",
    href: CONTACT_LINKS.phone,
    icon: Phone,
    classes:
      "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/30",
    external: false,
  },
  {
    key: "email",
    label: "Email",
    hint: BUSINESS.email,
    href: CONTACT_LINKS.email,
    icon: Mail,
    classes:
      "bg-white hover:bg-gray-50 text-primary border border-gray-200 shadow-sm",
    external: false,
  },
];

export default function ContactSplash() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setClosing(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage may be unavailable (private mode) */
    }
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 220);
  }, []);

  // Show once per browser session on first visit.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (!seen) {
      const t = window.setTimeout(() => setOpen(true), 350);
      return () => window.clearTimeout(t);
    }
  }, []);

  // Allow any component to reopen the splash.
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_CONTACT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, handler);
  }, []);

  // Lock scroll, trap focus target, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 ${
        closing ? "opacity-0" : "animate-fade-in"
      } transition-opacity duration-200`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-splash-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm cursor-default"
      />

      {/* Card */}
      <div
        className={`relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden ${
          closing ? "translate-y-4 opacity-0" : "animate-scale-in"
        } transition-all duration-200`}
      >
        {/* Header band */}
        <div className="bg-primary bg-grid-light text-white px-6 pt-6 pb-8 relative">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close and browse the site"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                {BUSINESS.shortName}
              </p>
              <p className="text-sm text-white/90">{BUSINESS.tagline}</p>
            </div>
          </div>

          <h2
            id="contact-splash-title"
            className="text-2xl sm:text-3xl font-bold leading-tight"
          >
            Garage door trouble?
            <br />
            <span className="text-accent">Reach Tomer in one tap.</span>
          </h2>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              {BUSINESS.hours}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              Licensed &amp; insured · {BUSINESS.serviceArea}
            </span>
          </div>
        </div>

        {/* Channels */}
        <div className="px-5 sm:px-6 py-5 space-y-3">
          {channels.map((c, i) => (
            <a
              key={c.key}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              onClick={() => {
                try {
                  sessionStorage.setItem(STORAGE_KEY, "1");
                } catch {
                  /* ignore */
                }
              }}
              className={`group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all active:scale-[0.98] animate-fade-up stagger-${(i + 1) * 100} ${c.classes} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary`}
            >
              <span className="w-11 h-11 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-6 h-6" />
              </span>
              <span className="flex-1 min-w-0 text-left">
                <span className="block font-semibold text-base leading-tight">
                  {c.label}
                </span>
                <span className="block text-xs opacity-80 truncate">
                  {c.hint}
                </span>
              </span>
              <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}

          <button
            type="button"
            onClick={close}
            className="w-full text-center text-sm text-muted hover:text-primary py-2 transition-colors animate-fade-up stagger-400"
          >
            Just browsing — take me to the site
          </button>
        </div>

        {/* Safe-area padding for phones with a home indicator */}
        <div className="h-[env(safe-area-inset-bottom)] sm:hidden" />
      </div>
    </div>
  );
}
