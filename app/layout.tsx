import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tomer's Garage Door Services | Maryland",
    template: "%s | Tomer's Garage Door",
  },
  description:
    "Professional garage door repair and installation in Maryland. Springs, openers, off-track doors — same-day service. Call Tomer for a free estimate.",
  keywords: [
    "garage door repair Maryland",
    "garage door spring repair",
    "garage door opener installation",
    "emergency garage door service",
    "garage door repair Baltimore",
    "garage door off track",
  ],
  openGraph: {
    title: "Tomer's Garage Door Services",
    description:
      "Fast, reliable garage door repair in Maryland. Free estimates. 5+ years experience.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
