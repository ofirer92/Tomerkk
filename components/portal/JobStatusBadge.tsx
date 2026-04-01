import type { JobStatus } from "@/types";
import { Clock, Calendar, CheckCircle2 } from "lucide-react";

const STATUS_CONFIG: Record<
  JobStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  waiting_for_parts: {
    label: "Waiting for Parts",
    className:
      "bg-status-waiting text-status-waiting-text",
    icon: Clock,
  },
  appointment_confirmed: {
    label: "Appointment Confirmed",
    className:
      "bg-status-confirmed text-status-confirmed-text",
    icon: Calendar,
  },
  job_completed: {
    label: "Job Completed",
    className:
      "bg-status-completed text-status-completed-text",
    icon: CheckCircle2,
  },
};

export default function JobStatusBadge({ status }: { status: JobStatus }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
