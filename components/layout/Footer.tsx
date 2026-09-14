import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Wrench } from "lucide-react";
import { BUSINESS, CONTACT_LINKS } from "@/lib/contact";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const serviceLinks = [
  { href: "/services/springs", label: "Spring Repair" },
  { href: "/services/openers", label: "Opener Installation" },
  { href: "/services/off-track", label: "Off-Track Door" },
  { href: "/book", label: "Free Estimate" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 font-bold text-lg mb-4">
            <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </span>
            <span>
              Tomer&apos;s <span className="text-accent">Garage</span>
            </span>
          </div>
          <p className="text-white/65 text-sm leading-relaxed max-w-sm">
            Independent, licensed garage door repair and installation across
            Maryland. You talk to the technician, get a straight price, and the
            job is done right the first time.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={CONTACT_LINKS.phone}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              Call
            </a>
            <a
              href={CONTACT_LINKS.email}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4 text-accent" />
              Email
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-3">
          <h3 className="font-semibold mb-4 text-white">Services</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <h3 className="font-semibold mb-4 text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              <a href={CONTACT_LINKS.phone} className="hover:text-accent transition-colors">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent flex-shrink-0" />
              <a
                href={CONTACT_LINKS.email}
                className="hover:text-accent transition-colors break-all"
              >
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Serving all of {BUSINESS.serviceArea}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                {BUSINESS.hours}
                <br />
                <span className="text-white/55">Emergency service available</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/45 text-xs">
          <span>
            © {new Date().getFullYear()} {BUSINESS.name} · Maryland Licensed
            Contractor
          </span>
          <Link href="/cancel" className="hover:text-white/80 transition-colors">
            Cancel a service agreement
          </Link>
        </div>
      </div>
    </footer>
  );
}
