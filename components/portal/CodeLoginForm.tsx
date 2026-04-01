"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, KeyRound } from "lucide-react";

export default function CodeLoginForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInput = (value: string) => {
    // Auto-format: strip non-alphanumeric, uppercase, prepend TOMER-
    const raw = value.replace(/[^A-Z0-9-]/gi, "").toUpperCase();

    // Keep only TOMER-XXXX shape
    if (raw.startsWith("TOMER-")) {
      const digits = raw.slice(6).replace(/\D/g, "").slice(0, 4);
      setCode(`TOMER-${digits}`);
    } else {
      const digits = raw.replace(/\D/g, "").slice(0, 4);
      setCode(digits ? `TOMER-${digits}` : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^TOMER-\d{4}$/.test(code)) {
      setError("Code must be in format TOMER-XXXX (e.g. TOMER-1234)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        router.push("/portal");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Code not recognized.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your customer code
        </label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={code}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="TOMER-1234"
            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-3 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-accent uppercase"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading || !/^TOMER-\d{4}$/.test(code)}
        className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Checking...
          </>
        ) : (
          "Access My Portal"
        )}
      </button>
    </form>
  );
}
