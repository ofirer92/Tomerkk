import Link from "next/link";
import { Phone, MapPin, Clock, Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Wrench className="w-5 h-5 text-accent" />
            <span>
              Tomer&apos;s <span className="text-accent">Garage</span>
            </span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Professional garage door repair and installation across Maryland.
            Honest pricing, same-day service.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3 text-accent">Services</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/services/springs" className="hover:text-accent transition-colors">
                Spring Repair
              </Link>
            </li>
            <li>
              <Link href="/services/openers" className="hover:text-accent transition-colors">
                Opener Installation
              </Link>
            </li>
            <li>
              <Link href="/services/off-track" className="hover:text-accent transition-colors">
                Off-Track Door
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-accent transition-colors">
                Free Estimate
              </Link>
            </li>
            <li>
              <Link href="/portal/login" className="hover:text-accent transition-colors">
                Customer Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 text-accent">Contact</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              <a href="tel:+12407000000" className="hover:text-accent transition-colors">
                (240) 700-0000
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Serving all of Maryland</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Mon–Sat: 7am – 7pm<br />Emergency service available</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-white/50 text-xs">
        © {new Date().getFullYear()} Tomer&apos;s Garage Door Services · Maryland Licensed Contractor
      </div>
    </footer>
  );
}
