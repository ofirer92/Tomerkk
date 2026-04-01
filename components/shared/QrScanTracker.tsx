"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function QrScanTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("ref") === "qr") {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "qr_scan",
          customer_id: searchParams.get("cid") ?? null,
          metadata: { source: "qr_sticker" },
        }),
      }).catch(() => {});
    }
  }, [searchParams]);

  return null;
}
