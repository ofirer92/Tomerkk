"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const BUSINESS_INFO = {
  name: "Tomer's Garage Door Services LLC",
  licenseId: "MD-GD-XXXXX", // Replace with actual license
  address: "Maryland, USA", // Replace with actual business address
  phone: "(240) 700-0000",
};

export default function CancelPage() {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real deployment, this would POST to an API route
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-2">
          Cancellation Submitted
        </h2>
        <p className="text-gray-600">
          Your cancellation has been recorded. A copy will be sent to you by
          email if provided.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-primary mb-2">
        Cancel a Service Agreement
      </h1>
      <p className="text-gray-600 mb-8 text-sm">
        Complete this form to formally cancel a service or agreement. Business
        information is pre-filled.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* Read-only business fields */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Business name
          </label>
          <input
            readOnly
            value={BUSINESS_INFO.name}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              License / ID
            </label>
            <input
              readOnly
              value={BUSINESS_INFO.licenseId}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Phone
            </label>
            <input
              readOnly
              value={BUSINESS_INFO.phone}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Business address
          </label>
          <input
            readOnly
            value={BUSINESS_INFO.address}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <hr />

        {/* Customer-filled fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cancellation date *
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for cancellation *
          </label>
          <textarea
            required
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="Please describe the reason..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Submit Cancellation
        </button>
      </form>
    </div>
  );
}
