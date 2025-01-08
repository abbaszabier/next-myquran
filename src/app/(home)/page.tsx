"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { useGetSurah, useGetDetailSurahByNomor } from "@/api/allSurah";
import ListSurah from "./components/listSurah";
import DetailSurahQuran from "./components/detailSurah";

export default function Home() {
  const [activeCard, setActiveCard] = useState(1);
  const { data, isLoading } = useGetSurah();
  const { data: detailSurah, isLoading: detailSurahLoading } =
    useGetDetailSurahByNomor(activeCard);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center bg-white w-full p-4">
        <h1 className="text-2xl font-bold">My Quran</h1>
        <Settings size={24} />
      </div>

      <div className="grid grid-cols-[22%_78%] flex-grow">
        <ListSurah
          data={data}
          setActiveCard={setActiveCard}
          activeCard={activeCard}
          isLoading={isLoading}
        />
        <DetailSurahQuran data={detailSurah} isLoading={detailSurahLoading} />
      </div>
    </div>
  );
}
