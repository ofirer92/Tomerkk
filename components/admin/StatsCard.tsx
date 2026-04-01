import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-start gap-4">
      <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-primary mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
