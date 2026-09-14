"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Wrench, Phone, Mail } from "lucide-react";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#why-me", label: "Why Tomer?" },
  { href: "/#promotions", label: "Promotions" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/20"
          : "bg-primary"
      }`}
    >
      {/* Top utility strip (desktop) */}
      <div className="hidden md:block bg-primary-dark/60 text-white/70 text-xs">
        <div className="max-w-6xl mx-auto px-4 h-8 flex items-center justify-between">
          <span>{BUSINESS.hours} · Emergency service available</span>
          <div className="flex items-center gap-5">
            <a
              href={CONTACT_LINKS.email}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {BUSINESS.email}
            </a>
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-bold text-lg"
          onClick={() => setOpen(false)}
        >
          <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-md shadow-accent/30">
            <Wrench className="w-5 h-5 text-white" />
          </span>
          <span className="leading-tight">
            Tomer&apos;s <span className="text-accent">Garage</span>
            <span className="block text-[10px] font-medium tracking-wider uppercase text-white/60">
              Door Services · MD
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm text-white/85">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={CONTACT_LINKS.phone}
            className="inline-flex items-center gap-2 text-white font-semibold text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4 text-accent" />
            {BUSINESS.phoneDisplay}
          </a>
          <Link
            href="/book"
            className="bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-accent/25 transition-all active:scale-[0.98]"
          >
            Free Estimate
          </Link>
        </div>

        {/* Mobile: call + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <a
            href={CONTACT_LINKS.phone}
            aria-label={`Call ${BUSINESS.phoneDisplay}`}
            className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-md shadow-accent/30 active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            className="w-10 h-10 rounded-xl text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-5 pt-1 space-y-1 border-t border-white/10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-whatsapp text-white font-semibold py-3 rounded-xl"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={CONTACT_LINKS.email}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold py-3 rounded-xl"
            >
              <Mail className="w-5 h-5 text-accent" />
              Email
            </a>
          </div>
          <Link
            href="/book"
            className="block bg-accent text-white font-semibold text-center py-3.5 rounded-xl mt-2 shadow-lg shadow-accent/25"
            onClick={() => setOpen(false)}
          >
            Get a Free Estimate
          </Link>
        </div>
      </div>
    </header>
  );
}
