"use client";

import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { BUSINESS, emailLink } from "@/lib/contact";

const BUSINESS_INFO = {
  name: `${BUSINESS.name} LLC`,
  licenseId: "MD-GD-XXXXX", // Replace with actual license
  address: "Maryland, USA", // Replace with actual business address
  phone: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
};

const inputClass =
  "w-full border border-gray-300 rounded-xl px-3.5 py-3 text-base sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";
const readOnlyClass =
  "w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm bg-surface text-gray-500 cursor-not-allowed";

export default function CancelPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      "I would like to cancel my service agreement.",
      "",
      `Name: ${name}`,
      `Cancellation date: ${date}`,
      `Reason: ${reason}`,
    ].join("\n");
    window.location.href = emailLink(`Service cancellation — ${name}`, body);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Your email app is opening
        </h2>
        <p className="text-muted">
          Send the pre-filled email to complete your cancellation. If nothing
          opened, email{" "}
          <a href={emailLink("Service cancellation", "")} className="text-accent font-semibold">
            {BUSINESS.email}
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-3">
        Cancellations
      </p>
      <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">
        Cancel a service agreement
      </h1>
      <p className="text-muted mb-8 text-sm">
        Complete this form to formally cancel a service or agreement. Business
        information is pre-filled.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1.5">
            Business name
          </label>
          <input readOnly value={BUSINESS_INFO.name} className={readOnlyClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              License / ID
            </label>
            <input readOnly value={BUSINESS_INFO.licenseId} className={readOnlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Phone
            </label>
            <input readOnly value={BUSINESS_INFO.phone} className={readOnlyClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1.5">
            Business address
          </label>
          <input readOnly value={BUSINESS_INFO.address} className={readOnlyClass} />
        </div>

        <hr className="border-gray-200" />

        <div>
          <label htmlFor="cancel-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Your name <span className="text-accent">*</span>
          </label>
          <input
            id="cancel-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="cancel-date" className="block text-sm font-medium text-gray-700 mb-1.5">
            Cancellation date <span className="text-accent">*</span>
          </label>
          <input
            id="cancel-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cancel-reason" className="block text-sm font-medium text-gray-700 mb-1.5">
            Reason for cancellation <span className="text-accent">*</span>
          </label>
          <textarea
            id="cancel-reason"
            required
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Please describe the reason..."
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          <Mail className="w-4 h-4" />
          Submit cancellation by email
        </button>
      </form>
    </div>
  );
}
