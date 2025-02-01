"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Surah } from "@/api/allSurah";
import LoadingListSurah from "./loadingSurah";
import { Input } from "@/components/ui/input";
import { toArabicNumber } from "@/lib/utils";

interface ListSurahProps {
  data?: Surah[];
  isLoading: boolean;
  setActiveCard: (value: number) => void;
  activeCard: number;
  className?: string;
}

const ListSurah: React.FC<ListSurahProps> = ({
  data,
  isLoading,
  setActiveCard,
  activeCard,
  className,
}) => {
  const [isMac, setIsMac] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardClick = (nomor: number) => {
    setActiveCard(nomor);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredData = (data ?? []).filter((surah) =>
    surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    setIsMac(platform.includes("mac"));
  }, []);

  if (isLoading) return <LoadingListSurah />;

  return (
    <div
      className={`bg-background sticky top-0 pb-4 space-y-4 overflow-y-auto max-h-[calc(100vh)] border border-l-0 border-r-0 border-gray-200 dark:border-gray-800 border-t-0 ${className}`}
    >
      <div className="flex items-center justify-center sticky top-0 z-100 justify-between items-center h-[80px] px-4 bg-background border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150">
        <div className="bg-gray-50 dark:bg-background px-3 rounded-lg flex items-center justify-center w-full border border-gray-200 dark:border-gray-800">
          <Input
            placeholder="Cari Surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none shadow-none dark:bg-background dark:text-white"
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            {isMac ? (
              <>
                <span className="text-xs">⌘</span>K
              </>
            ) : (
              <div className={`${!isMac && "hidden"}`}>
                <span className="text-xs">CTRL</span>K
              </div>
            )}
          </kbd>
        </div>
      </div>
      {filteredData.length > 0 ? (
        filteredData.map((surah, index) => (
          <Card
            key={index}
            className={`m-4 cursor-pointer ${
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
        ))
      ) : (
        <div className="flex justify-center h-full text-gray-500">
          Surah tidak ditemukan
        </div>
      )}
    </div>
  );
};

export default ListSurah;
