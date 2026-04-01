"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface AddJobFormProps {
  customerId: string;
}

const SERVICE_OPTIONS = [
  { value: "spring", label: "קפיצים" },
  { value: "opener", label: "מנוע" },
  { value: "off-track", label: "אוף-טראק" },
  { value: "installation", label: "התקנה" },
  { value: "other", label: "אחר" },
];

export default function AddJobForm({ customerId }: AddJobFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    description: "",
    service_type: "spring",
    cost: "",
    technician_notes: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          description: form.description,
          service_type: form.service_type,
          status: "appointment_confirmed",
          cost: form.cost ? parseFloat(form.cost) : undefined,
          technician_notes: form.technician_notes || undefined,
        }),
      });

      if (res.ok) {
        toast.success("עבודה נוספה בהצלחה");
        setOpen(false);
        setForm({ description: "", service_type: "spring", cost: "", technician_notes: "" });
        router.refresh();
      } else {
        toast.error("שגיאה בהוספת עבודה");
      }
    } catch {
      toast.error("שגיאת רשת");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-accent hover:text-accent-hover font-medium text-sm transition-colors"
      >
        <Plus className="w-4 h-4" />
        הוסף עבודה חדשה
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3"
    >
      <h3 className="font-semibold text-primary text-sm">עבודה חדשה</h3>

      <div>
        <label className="block text-xs text-gray-600 mb-1">תיאור *</label>
        <input
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="החלפת קפיץ תפס..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">סוג שירות</label>
          <select
            value={form.service_type}
            onChange={(e) => setForm({ ...form, service_type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">מחיר ($)</label>
          <input
            type="number"
            step="0.01"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="150.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-600 mb-1">הערות טכנאי</label>
        <textarea
          rows={2}
          value={form.technician_notes}
          onChange={(e) => setForm({ ...form, technician_notes: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="הערות פנימיות..."
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "שמור"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
