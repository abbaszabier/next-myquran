"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import FloatingButton from "./ui/floating-button";
import QuranIcon from "./icons/quranIcon";
import ShalatIcon from "./icons/shalatIcon";

export default function Navbot() {
  const router = usePathname();

  return (
    <>
      {/* <FloatingButton router={router} /> */}
      <div className="md:hidden w-full fixed bottom-0 z-50 flex justify-between h-[55px] bg-background border-t border-gray-100 dark:border-gray-800 text-black dark:text-white shadow-[rgba(0,0,15,0.1)_10px_10px_10px_10px]">
        <Link
          href="/"
          className={`flex-1 flex justify-center items-center text-black dark:text-white`}
        >
          <nav
            className={`flex flex-col items-center ${
              router === "/" ? "opacity-100" : "opacity-40"
            }`}
          >
            <QuranIcon
              className={`h-[24px] w-[24px] text-black dark:text-white`}
            />
            <span className={`text-xs font-medium`}>Quran</span>
          </nav>
        </Link>

        <div className="w-[1px] bg-gray-200 dark:bg-gray-800"></div>

        <Link
          href="/shalat"
          className={`flex-1 flex items-center justify-center opacity-100 items-center`}
        >
          <nav
            className={`flex flex-col items-center ${
              router === "/shalat" ? "opacity-100" : "opacity-40"
            }`}
          >
            <ShalatIcon
              className={`h-[24px] w-[24px] text-black dark:text-white`}
            />
            <span className={`text-xs font-medium`}>Shalat</span>
          </nav>
        </Link>
      </div>
    </>
  );
}
