"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wrench, Phone } from "lucide-react";

const navLinks = [
  { href: "/services/springs", label: "Common Issues" },
  { href: "/#why-me", label: "Why Tomer?" },
  { href: "/services/springs#installation", label: "Door Installation" },
  { href: "/#promotions", label: "Promotions" },
  { href: "/book", label: "Book Appointment" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <Wrench className="w-6 h-6 text-accent" />
          <span>
            Tomer&apos;s <span className="text-accent">Garage</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+12407000000"
            className="flex items-center gap-1 text-white/90 text-sm hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>(240) 700-0000</span>
          </a>
          <Link
            href="/book"
            className="bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Free Estimate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary-dark px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-white/90 hover:text-accent py-2 border-b border-white/10 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+12407000000"
            className="flex items-center gap-2 text-white/90 py-2"
          >
            <Phone className="w-4 h-4 text-accent" />
            (240) 700-0000
          </a>
          <Link
            href="/book"
            className="block bg-accent text-white font-semibold text-center py-3 rounded-lg mt-2"
            onClick={() => setOpen(false)}
          >
            Get Free Estimate
          </Link>
        </div>
      )}
    </header>
  );
}
