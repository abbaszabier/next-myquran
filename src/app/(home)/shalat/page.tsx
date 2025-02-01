"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, CloudSun, Sunset, Sunrise } from "lucide-react";
import { SelectKota } from "../components/selectKota";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { useSettingsStore } from "@/store/settings";
import { useGetShalatBulanan, useGetShalatHarian } from "@/api/shalat";
import { DataTable } from "./data-table";
import { Jadwal, columns } from "./colums";
import Loading from "./loading";

export default function ShalatPage() {
  const { kota, idKota } = useSettingsStore((state) => state);
  const tahun = new Date().getFullYear();
  const bulan = new Date().getMonth() + 1;
  const tanggal = new Date().getDate();

  const { data, isLoading } = useGetShalatHarian(idKota, tahun, bulan, tanggal);
  const { data: jadwalShalatBulanan } = useGetShalatBulanan(
    idKota,
    tahun,
    bulan
  );

  const shalatBulanan: Jadwal[] = Array.isArray(jadwalShalatBulanan?.jadwal)
    ? jadwalShalatBulanan.jadwal
    : [];

  if (isLoading) {
    return <Loading text="Memuat data shalat..." color="text-black" />;
  }

  const jadwalShalatHarian = Object.entries(data?.jadwal ?? [])
    .filter(
      ([key]) =>
        key === "imsak" ||
        key === "subuh" ||
        key === "terbit" ||
        key === "dhuha" ||
        key === "dzuhur" ||
        key === "ashar" ||
        key === "maghrib" ||
        key === "isya"
    )
    .map(([key, value]) => ({
      [key]: value,
    }));

  const filterIcon = (name: string) => {
    switch (name) {
      case "imsak":
        return <Sunrise />;
      case "subuh":
        return <Sunrise />;
      case "terbit":
        return <CloudSun />;
      case "dhuha":
        return <CloudSun />;
      case "dzuhur":
        return <Sun />;
      case "ashar":
        return <Sun />;
      case "maghrib":
        return <Sunset />;
      case "isya":
        return <Moon />;
      default:
        return <Sun />;
    }
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.8] bg-dot-black/[0.5] relative flex items-center justify-center">
      <HeroHighlight>
        <div className="p-4 md:px-12 w-full relative">
          {/* Jadwal Hari Ini */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-4xl md:px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto py-8 mb-2"
          >
            Jadwal shalat daerah <br />
            <Highlight className="text-black dark:text-white">
              {kota}
            </Highlight>{" "}
            dan sekitarnya
          </motion.h1>
          <Card className="mb-8 p-6">
            <CardContent className="p-0">
              <div className="flex flex-col justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <SelectKota />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {jadwalShalatHarian.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-foreground dark:text-background py-3 px-3 bg-gray-100 rounded-md text-center dark:bg-white shadow"
                  >
                    {filterIcon(Object.keys(schedule)[0])}
                    <span className="font-semibold text-sm mt-1">
                      {Object.values(schedule)}
                    </span>
                    <span className="text-xs opacity-50">
                      {Object.keys(schedule)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="overflow-x-auto pb-16">
            <DataTable columns={columns} data={shalatBulanan} />
          </div>
        </div>
      </HeroHighlight>
    </div>
  );
}
