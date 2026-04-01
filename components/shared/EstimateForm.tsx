"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstimateFormSchema, type EstimateFormValues } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Loader2 } from "lucide-react";

interface EstimateFormProps {
  source?: string;
  onSuccess?: () => void;
}

export default function EstimateForm({
  source = "website",
  onSuccess,
}: EstimateFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EstimateFormValues>({
    resolver: zodResolver(EstimateFormSchema),
    defaultValues: { source },
  });

  const onSubmit = async (data: EstimateFormValues) => {
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setSubmitted(true);
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
        <h3 className="text-xl font-bold text-primary">Got it — I&apos;ll be in touch soon!</h3>
        <p className="text-gray-600 text-sm">
          Tomer will call or text you within a few hours. For urgent issues,
          call (240) 700-0000.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("source")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your name *
          </label>
          <input
            {...register("name")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone number *
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="(240) 555-0000"
          />
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (optional)
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service address *
        </label>
        <input
          {...register("address")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="123 Main St, Rockville, MD"
        />
        {errors.address && (
          <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred date
          </label>
          <input
            {...register("preferred_date")}
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred time
          </label>
          <select
            {...register("preferred_time")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
          >
            <option value="">Any time</option>
            <option value="morning">Morning (7am–12pm)</option>
            <option value="afternoon">Afternoon (12pm–5pm)</option>
            <option value="evening">Evening (5pm–7pm)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What&apos;s going on? (optional)
        </label>
        <textarea
          {...register("service_interest")}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="Broken spring, noisy opener, door off track..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Estimate Request"
        )}
      </button>
    </form>
  );
}
