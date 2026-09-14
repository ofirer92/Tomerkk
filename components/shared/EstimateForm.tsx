"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstimateFormSchema, type EstimateFormValues } from "@/types";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { BUSINESS, CONTACT_LINKS, emailLink, whatsappLink } from "@/lib/contact";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

interface EstimateFormProps {
  source?: string;
  onSuccess?: () => void;
}

type Channel = "whatsapp" | "email";

const TIME_LABELS: Record<string, string> = {
  morning: "Morning (8am–12pm)",
  afternoon: "Afternoon (12pm–3pm)",
  evening: "Late afternoon (3pm–6pm)",
};

const inputClass =
  "w-full border border-gray-300 rounded-xl px-3.5 py-3 text-base sm:text-sm bg-white text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow";

function buildMessage(data: EstimateFormValues) {
  const lines = [
    `Hi ${BUSINESS.owner}, I'd like a free garage door estimate.`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Address: ${data.address}`,
    data.preferred_date ? `Preferred date: ${data.preferred_date}` : null,
    data.preferred_time
      ? `Preferred time: ${TIME_LABELS[data.preferred_time] ?? data.preferred_time}`
      : null,
    data.service_interest ? `Issue: ${data.service_interest}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

/**
 * Static-hosting friendly estimate form: instead of posting to an API,
 * it composes the request and hands it off to WhatsApp or the visitor's
 * email client. Works on desktop and deep-links into the apps on mobile.
 */
export default function EstimateForm({
  source = "website",
  onSuccess,
}: EstimateFormProps) {
  const [sentVia, setSentVia] = useState<Channel | null>(null);
  const [channel, setChannel] = useState<Channel>("whatsapp");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EstimateFormValues>({
    resolver: zodResolver(EstimateFormSchema),
    defaultValues: { source },
  });

  const onSubmit = (data: EstimateFormValues) => {
    const message = buildMessage(data);
    const url =
      channel === "whatsapp"
        ? whatsappLink(message)
        : emailLink(`Estimate request from ${data.name}`, message);

    if (channel === "whatsapp") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
    setSentVia(channel);
    onSuccess?.();
  };

  if (sentVia) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-primary">
          {sentVia === "whatsapp"
            ? "WhatsApp is opening with your request"
            : "Your email app is opening with your request"}
        </h3>
        <p className="text-muted text-sm max-w-sm">
          Just hit send and {BUSINESS.owner} will get back to you shortly. If
          nothing opened, reach out directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={CONTACT_LINKS.phone}
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary border border-gray-200 rounded-xl px-4 py-2.5 hover:bg-surface"
          >
            <Phone className="w-4 h-4 text-accent" /> {BUSINESS.phoneDisplay}
          </a>
          <a
            href={CONTACT_LINKS.email}
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary border border-gray-200 rounded-xl px-4 py-2.5 hover:bg-surface"
          >
            <Mail className="w-4 h-4 text-accent" /> {BUSINESS.email}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setSentVia(null)}
          className="text-xs text-muted underline underline-offset-2 hover:text-primary"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input type="hidden" {...register("source")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="est-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Your name <span className="text-accent">*</span>
          </label>
          <input
            id="est-name"
            autoComplete="name"
            {...register("name")}
            className={inputClass}
            placeholder="John Smith"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="est-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone number <span className="text-accent">*</span>
          </label>
          <input
            id="est-phone"
            {...register("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="(443) 555-0000"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="est-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="est-email"
          {...register("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          className={inputClass}
          placeholder="john@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="est-address" className="block text-sm font-medium text-gray-700 mb-1.5">
          Service address <span className="text-accent">*</span>
        </label>
        <input
          id="est-address"
          {...register("address")}
          autoComplete="street-address"
          className={inputClass}
          placeholder="123 Main St, Baltimore, MD"
          aria-invalid={!!errors.address}
        />
        {errors.address && (
          <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="est-date" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred date
          </label>
          <input
            id="est-date"
            {...register("preferred_date")}
            type="date"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="est-time" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred time
          </label>
          <select id="est-time" {...register("preferred_time")} className={inputClass}>
            <option value="">Any time</option>
            <option value="morning">Morning (8am–12pm)</option>
            <option value="afternoon">Afternoon (12pm–3pm)</option>
            <option value="evening">Late afternoon (3pm–6pm)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="est-issue" className="block text-sm font-medium text-gray-700 mb-1.5">
          What&apos;s going on?{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="est-issue"
          {...register("service_interest")}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Broken spring, noisy opener, door off track..."
        />
      </div>

      <div className="pt-1 space-y-3">
        <p className="text-xs text-muted text-center">
          Choose how you&apos;d like to send it — your details are filled in
          for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="submit"
            onClick={() => setChannel("whatsapp")}
            className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-whatsapp/25 transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Send via WhatsApp
          </button>
          <button
            type="submit"
            onClick={() => setChannel("email")}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            <Mail className="w-5 h-5" />
            Send via Email
          </button>
        </div>
      </div>
    </form>
  );
}
