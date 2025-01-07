"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { useGetSurah } from "@/api/allSurah";
import ListSurah from "./components/listSurah";

export default function Home() {
  const [activeCard, setActiveCard] = useState(1);
  const { data } = useGetSurah();
  //   const { data: detailSurah } = useGetDetailSurahByNomor(activeCard);
  console.log(data);

  return (
    <div className="bg-red-100 min-h-screen flex flex-col">
      <div className="flex justify-between items-center bg-white w-full p-4">
        <h1 className="text-2xl font-bold">My Quran</h1>
        <Settings size={24} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[22%_78%] flex-grow">
        <ListSurah
          data={data}
          setActiveCard={setActiveCard}
          activeCard={activeCard}
        />
        <div className="bg-white border border-l p-4">{activeCard}</div>
      </div>
    </div>
  );
}
