"use client";

import { useState } from "react";
import type { JobStatus } from "@/types";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: "appointment_confirmed", label: "פגישה אושרה" },
  { value: "waiting_for_parts", label: "מחכה לציוד" },
  { value: "job_completed", label: "הסתיים" },
];

interface JobStatusUpdaterProps {
  jobId: string;
  currentStatus: JobStatus;
}

export default function JobStatusUpdater({
  jobId,
  currentStatus,
}: JobStatusUpdaterProps) {
  const [status, setStatus] = useState<JobStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: JobStatus) => {
    if (newStatus === status) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        toast.success("סטטוס עודכן");
      } else {
        toast.error("שגיאה בעדכון סטטוס");
      }
    } catch {
      toast.error("שגיאת רשת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value as JobStatus)}
        disabled={loading}
        className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {loading && <Loader2 className="w-3 h-3 animate-spin text-gray-400" />}
    </div>
  );
}
