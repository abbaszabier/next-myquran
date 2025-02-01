"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownNavtop from "@/app/(home)/components/dropdownNavtop";
import { usePathname } from "next/navigation";

export default function Navtop() {
  const [darkMode, setDarkMode] = useState(false);
  const router = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800 justify-between items-center bg-background w-full px-4 py-3">
      <div className="flex items-center space-x-2">
        <Image
          src="/logo-quranku.svg"
          className="h-[40px] w-[40px]"
          width={0}
          height={0}
          alt="QuranKu"
        />
        <h1 className="text-xl font-bold">QuranKu</h1>
      </div>
      <div className="flex items-center space-x-6">
        <nav className="space-x-4 hidden md:block">
          <Link
            href="/"
            className={`text-md hover:text-black text-black dark:hover:text-white
              ${
                router === "/"
                  ? "font-semibold dark:text-white"
                  : "text-muted-foreground"
              }`}
          >
            Quran
          </Link>
          <Link
            href="/shalat"
            className={`text-md hover:text-black dark:hover:text-white
              ${
                router === "/shalat"
                  ? "font-semibold dark:text-white"
                  : "text-muted-foreground"
              }`}
          >
            Shalat
          </Link>
        </nav>
        <DropdownNavtop darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}
