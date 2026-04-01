"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCustomerSchema, type CreateCustomerValues } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, CheckCircle2, Loader2 } from "lucide-react";

export default function CustomerForm() {
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateCustomerValues>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: {
      is_vip: false,
      vip_discount_pct: 0,
      qr_target: "estimate",
    },
  });

  const isVip = watch("is_vip");

  const onSubmit = async (data: CreateCustomerValues) => {
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      setCreatedCode(result.customer.code);
    }
  };

  const copyCode = async () => {
    if (!createdCode) return;
    await navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (createdCode) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-xl font-bold text-primary">לקוח נוצר בהצלחה!</h2>
        <p className="text-gray-600 text-sm">הקוד האישי של הלקוח:</p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 inline-flex items-center gap-3">
          <span className="font-mono text-2xl font-bold text-primary tracking-widest">
            {createdCode}
          </span>
          <button
            onClick={copyCode}
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {copied ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-gray-500 text-sm">
          שלח את הקוד הזה ללקוח — הוא ישמש לכניסה לפורטל.
        </p>
        <button
          onClick={() => router.push("/admin/customers")}
          className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          חזרה לרשימת לקוחות
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            שם מלא *
          </label>
          <input
            {...register("full_name")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="ישראל ישראלי"
          />
          {errors.full_name && (
            <p className="text-red-600 text-xs mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            טלפון
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="(240) 555-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            אימייל
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="email@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            כתובת
          </label>
          <input
            {...register("address")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="123 Main St, Rockville, MD"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            הערות פנימיות
          </label>
          <textarea
            {...register("notes")}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="הערות שיופיעו רק לך..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6 pt-2 pb-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("is_vip")}
            className="w-4 h-4 rounded text-accent"
          />
          <span className="text-sm font-medium text-gray-700">לקוח VIP</span>
        </label>

        {isVip && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">הנחה:</label>
            <input
              type="number"
              {...register("vip_discount_pct", { valueAsNumber: true })}
              min={0}
              max={100}
              className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          יעד ה-QR
        </label>
        <select
          {...register("qr_target")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white"
        >
          <option value="estimate">דף הערכת מחיר</option>
          <option value="portal">פורטל לקוחות (עם קוד)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            יוצר לקוח...
          </>
        ) : (
          "צור לקוח חדש"
        )}
      </button>
    </form>
  );
}
