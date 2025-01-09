import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Surah } from "@/api/allSurah";
import LoadingListSurah from "./loadingSurah";

interface ListSurahProps {
  data?: Surah[];
  isLoading: boolean;
  setActiveCard: (value: number) => void;
  activeCard: number;
}

const ListSurah: React.FC<ListSurahProps> = ({
  data,
  isLoading,
  setActiveCard,
  activeCard,
}) => {
  const [isMac, setIsMac] = useState(false);
  const handleCardClick = (nomor: number) => {
    setActiveCard(nomor);
  };

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    setIsMac(platform.includes("mac"));
  }, []);

  if (isLoading) return <LoadingListSurah />;

  return (
    <div className="bg-white space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] border border-r-0">
      <div className="flex items-center justify-center sticky top-0 z-100 justify-between items-center h-[80px] px-4 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-80 backdrop-filter backdrop-saturate-150">
        <div className="bg-gray-50 p-2 px-3 rounded-lg flex items-center justify-center w-full gap-2 border border-gray-200">
          <input
            type="text"
            placeholder="Search Surah..."
            className="flex-grow bg-transparent outline-none"
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            {isMac ? (
              <>
                <span className="text-xs">⌘</span>K
              </>
            ) : (
              <>
                <span className="text-xs">CTRL</span>K
              </>
            )}
          </kbd>
        </div>
      </div>
      {data?.map((surah, index) => (
        <Card
          key={index}
          className={`m-4 cursor-pointer ${
            activeCard === surah.nomor
              ? "bg-foreground"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleCardClick(surah.nomor)}
        >
          <CardHeader className="flex flex-row gap-4 items-center">
            <div
              className={`${
                activeCard === surah.nomor
                  ? "bg-background text-foreground"
                  : "bg-foreground text-white"
              } h-[32px] rounded-full w-[32px] flex justify-center items-center text-sm p-1`}
            >
              <div className="w-full h-full flex justify-center items-center">
                {surah.nomor}
              </div>
            </div>

            <div className="flex flex-col">
              <CardTitle
                className={`${
                  activeCard === surah.nomor ? "text-white" : "text-foreground"
                } text-sm`}
              >
                {surah.namaLatin}
              </CardTitle>
              <CardDescription
                className={`${
                  activeCard === surah.nomor ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {surah.arti} ⊙ {surah.jumlahAyat} Ayat
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ListSurah;
