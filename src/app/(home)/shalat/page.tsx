"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, CloudSun, Sunset, Sunrise } from "lucide-react";
import { SelectKota } from "../components/selectKota";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { useSettingsStore } from "@/store/settings";
import { Shalat, useGetShalatBulanan, useGetShalatHarian } from "@/api/shalat";
import { DataTable } from "./data-table";
import { Jadwal, columns } from "./colums";
import Loading from "./loading";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";

export default function ShalatPage() {
  const { kota, idKota } = useSettingsStore((state) => state);
  const tahun = new Date().getFullYear();
  const bulan = new Date().getMonth() + 1;
  const tanggal = new Date().getDate();
  const online = typeof window !== "undefined" ? navigator.onLine : true;

  // Shalat Bulanan
  const { data: jadwalShalatBulanan } = useGetShalatBulanan(
    idKota,
    tahun,
    bulan,
    online ? { enabled: online } : { enabled: false }
  );
  const [jadwalIbadahBulanan, setJadwalIbadahBulanan] = useState<Shalat>();

  useEffect(() => {
    if (online) {
      const saveDataShalatBulanan: Shalat = {
        id: idKota,
        lokasi: kota,
        daerah: jadwalShalatBulanan?.daerah ?? "",
        jadwal: jadwalShalatBulanan?.jadwal ?? {
          tanggal: "",
          imsak: "",
          subuh: "",
          terbit: "",
          dhuha: "",
          dzuhur: "",
          ashar: "",
          maghrib: "",
          isya: "",
          date: "",
        },
      };

      db.jadwalShalatBulanan.bulkPut([saveDataShalatBulanan]).then(() => {
        console.log("Data shalat bulanan berhasil disimpan");
      });

      setJadwalIbadahBulanan(saveDataShalatBulanan);
    }
  }, [
    idKota,
    jadwalShalatBulanan?.daerah,
    jadwalShalatBulanan?.jadwal,
    kota,
    online,
  ]);

  useEffect(() => {
    if (!online) {
      db.jadwalShalatBulanan
        .where("id")
        .equals(idKota)
        .first()
        .then((data) => {
          setJadwalIbadahBulanan(data);
        });
    }
  }, [idKota, online]);

  const shalatBulanan: Jadwal[] = Array.isArray(jadwalIbadahBulanan?.jadwal)
    ? jadwalIbadahBulanan.jadwal
    : [];

  // Shalat Harian
  const { data, isLoading } = useGetShalatHarian(
    idKota,
    tahun,
    bulan,
    tanggal,
    online ? { enabled: online } : { enabled: false }
  );

  const [jadwalIbadahHarian, setJadwalIbadahHarian] = useState<Shalat>();

  useEffect(() => {
    if (online) {
      const saveDataShalatHarian: Shalat = {
        id: idKota,
        lokasi: kota,
        daerah: data?.daerah ?? "",
        jadwal: data?.jadwal ?? {
          tanggal: "",
          imsak: "",
          subuh: "",
          terbit: "",
          dhuha: "",
          dzuhur: "",
          ashar: "",
          maghrib: "",
          isya: "",
          date: "",
        },
      };

      db.jadwalShalatHarian.bulkPut([saveDataShalatHarian]).then(() => {
        console.log("Data shalat harian berhasil disimpan");
      });

      setJadwalIbadahHarian(saveDataShalatHarian);
    }
  }, [data, idKota, kota, online]);

  useEffect(() => {
    if (!online) {
      db.jadwalShalatHarian
        .where("id")
        .equals(idKota)
        .first()
        .then((data) => {
          setJadwalIbadahHarian(data);
        });
    }
  }, [idKota, online]);

  const jadwalShalatHarian = Object.entries(jadwalIbadahHarian?.jadwal ?? [])
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

  const jadwalIbadahHarianFromDb = useLiveQuery(
    () => db.jadwalShalatHarian.toArray(),
    []
  );

  const check = jadwalIbadahHarianFromDb?.some((chek) => chek.lokasi === kota);

  const handleUndefinedJadwalIbadahHarianFromDb =
    typeof check === "undefined" ? true : check;

  if (!online && !handleUndefinedJadwalIbadahHarianFromDb) {
    redirect("/offline");
  }

  if (online && isLoading) {
    return <Loading text="Memuat data shalat..." color="text-black" />;
  }

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
            className="text-3xl md:px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto py-6 mb-2"
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
