import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServicePreviewCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  urgent?: boolean;
}

export default function ServicePreviewCard({
  icon: Icon,
  title,
  description,
  href,
  urgent,
}: ServicePreviewCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-white border border-gray-200/80 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-orange/60 transition-all duration-300 flex flex-col gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20 group-hover:bg-orange group-hover:shadow-orange/30 transition-colors">
          <Icon className="w-7 h-7" />
        </div>
        {urgent && (
          <span className="text-[11px] uppercase tracking-wider bg-red-50 text-red-700 border border-red-100 font-semibold px-2.5 py-1 rounded-full">
            Urgent
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-primary text-xl mb-2">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 text-orange text-sm font-semibold">
        Learn more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
