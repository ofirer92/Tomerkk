import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { BUSINESS, IMAGES } from "@/lib/contact";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ofirer92.github.io/tomerkk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} | Garage Door Repair & Installation in Maryland`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Kabriz Garage Doors — friendly, licensed garage door sales, installation and repair across Maryland. Springs, openers, off-track doors, same-day service. WhatsApp, call, or email Tomer for a free estimate.",
  keywords: [
    "Kabriz Garage Doors",
    "garage door repair Maryland",
    "garage door spring repair",
    "garage door opener installation",
    "emergency garage door service",
    "garage door repair Baltimore",
    "garage door off track",
  ],
  applicationName: BUSINESS.name,
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
      "Friendly, licensed garage door repair and installation in Maryland. Free estimates. Reach Tomer on WhatsApp, phone, or email.",
    type: "website",
    locale: "en_US",
    siteName: BUSINESS.name,
    images: [{ url: IMAGES.og, width: 1200, height: 630, alt: `${BUSINESS.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    images: [IMAGES.og],
  },
};

export const viewport: Viewport = {
  themeColor: "#1d3a6b",
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
    <html lang="en" dir="ltr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-ink">
        {children}
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
