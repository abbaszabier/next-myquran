import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryClientProviderWrapper from "@/api/queryProvider";
import "./globals.css";
import Navbot from "@/components/navbot";
import Navtop from "@/components/navtop";

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
  icons: "/logo-quranku.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProviderWrapper>
          <Navtop />
          {children}
          <Navbot />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
