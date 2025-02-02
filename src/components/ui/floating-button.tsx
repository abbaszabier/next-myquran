"use client";

import * as React from "react";
import ListSurahIcon from "@/components/icons/listSurahIcon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailSurah, useGetSurah } from "@/api/allSurah";
import { Input } from "@/components/ui/input";
import { toArabicNumber } from "@/lib/utils";
import { Search } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

interface FloatingButtonProps {
  router: string;
  setActiveCard: (value: number) => void;
  activeCard?: number;
  data?: DetailSurah;
}

const FloatingButton = ({
  router,
  setActiveCard,
  activeCard,
}: FloatingButtonProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const online = typeof window !== "undefined" ? navigator.onLine : true;
  const listSurah = useLiveQuery(() => db.listSurah.toArray(), []);

  const { data } = useGetSurah({ enabled: online });
  const filteredData = (online ? data ?? [] : listSurah ?? []).filter((surah) =>
    surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleCardClick = (nomor: number) => {
    setActiveCard(nomor);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`fixed lg:hidden bottom-20 right-4 text-white dark:text-black ${
        router === "/shalat" ? "hidden" : ""
      }`}
    >
      <Drawer>
        <DrawerTrigger asChild>
          <button className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg text-dark dark:text-dark">
            <ListSurahIcon
              className={`w-[28px] h-[28px] text-dark dark:text-dark`}
            />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Daftar Surah</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-2 bg-background">
              <div className="sticky top-0 bg-gray-50 dark:bg-background px-3 rounded-lg flex items-center justify-center w-full border border-gray-200 dark:border-gray-800">
                <Input
                  placeholder="Cari Surah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none shadow-none dark:bg-background dark:text-white"
                />
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <Search size={12} />
                </kbd>
              </div>
            </div>
            <div className="px-4 pb-4 pb-0 h-[calc(80vh-80px)] overflow-y-auto">
              {filteredData.length > 0 ? (
                filteredData.map((surah, index) => (
                  <DrawerClose className="w-full text-left my-2" key={index}>
                    <Card
                      className={`cursor-pointer ${
                        activeCard === surah.nomor
                          ? "bg-foreground text-white"
                          : "bg-background hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => handleCardClick(surah.nomor)}
                    >
                      <CardHeader className="flex flex-row gap-4 items-center">
                        <div
                          className={`${
                            activeCard === surah.nomor
                              ? "bg-background text-foreground"
                              : "bg-foreground text-background"
                          } h-[32px] rounded-full w-[32px] flex justify-center items-center text-sm p-1`}
                        >
                          <div className="w-full h-full flex justify-center items-center">
                            {toArabicNumber(surah.nomor)}
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <CardTitle
                            className={`${
                              activeCard === surah.nomor
                                ? "text-background"
                                : "text-foreground"
                            } text-sm`}
                          >
                            {surah.namaLatin}
                          </CardTitle>
                          <CardDescription
                            className={`${
                              activeCard === surah.nomor
                                ? "text-gray-400 dark:text-gray-500"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {surah.arti} ⊙ {surah.jumlahAyat} Ayat
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  </DrawerClose>
                ))
              ) : (
                <div className="flex justify-center h-full pt-6 text-gray-500">
                  Surah tidak ditemukan
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FloatingButton;
