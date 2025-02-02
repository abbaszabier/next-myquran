import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryClientProviderWrapper from "@/api/queryProvider";
import "./globals.css";
import Navbot from "@/components/navbot";
import Navtop from "@/components/navtop";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuranKu",
  description: "A simple Quran app built with Next JS",
  icons: "/logo-quranku192x192.webp",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QuranKu",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "QuranKu",
    title: {
      default: "QuranKu",
      template: "%s | QuranKu",
    },
    description: "A simple Quran app built with Next JS",
  },
  twitter: {
    card: "summary",
    title: {
      default: "QuranKu",
      template: "%s | QuranKu",
    },
    description: "A simple Quran app built with Next JS",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProviderWrapper>
          <Navtop />
          {children}
          <Toaster />
          <Navbot />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
