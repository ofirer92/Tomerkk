"use client";

import { useEffect } from "react";

export default function AdminRtlWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const prevDir = html.getAttribute("dir");
    const prevLang = html.getAttribute("lang");
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "he");

    return () => {
      html.setAttribute("dir", prevDir ?? "ltr");
      html.setAttribute("lang", prevLang ?? "en");
    };
  }, []);

  return <>{children}</>;
}
