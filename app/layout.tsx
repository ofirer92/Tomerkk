import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { BUSINESS } from "@/lib/contact";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ofirer92.github.io/tomerkk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} | Maryland`,
    template: `%s | ${BUSINESS.shortName} Door`,
  },
  description:
    "Professional garage door repair and installation in Maryland. Springs, openers, off-track doors — same-day service. WhatsApp, call, or email Tomer for a free estimate.",
  keywords: [
    "garage door repair Maryland",
    "garage door spring repair",
    "garage door opener installation",
    "emergency garage door service",
    "garage door repair Baltimore",
    "garage door off track",
  ],
  applicationName: BUSINESS.shortName,
  appleWebApp: {
    capable: true,
    title: BUSINESS.shortName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: BUSINESS.name,
    description:
      "Fast, reliable garage door repair in Maryland. Free estimates. Reach Tomer on WhatsApp, phone, or email.",
    type: "website",
    locale: "en_US",
    siteName: BUSINESS.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2740",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
