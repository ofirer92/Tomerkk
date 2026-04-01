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
      className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-accent transition-all flex flex-col gap-4"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-primary text-lg">{title}</h3>
            {urgent && (
              <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full">
                Common
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
        Learn more <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
