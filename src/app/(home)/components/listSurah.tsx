import React from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Surah } from "@/api/allSurah";

interface ListSurahProps {
  data?: Surah[];
  setActiveCard: (value: number) => void;
  activeCard: number;
}

const ListSurah: React.FC<ListSurahProps> = ({
  data,
  setActiveCard,
  activeCard,
}) => {
  const handleCardClick = (nomor: number) => {
    setActiveCard(nomor);
  };

  return (
    <div className="bg-white p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] border border-r-0">
      <div className="bg-gray-100 p-2 rounded-lg flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Surah..."
          className="flex-grow bg-transparent outline-none"
        />
        <Search size={20} />
      </div>
      {data?.map((surah, index) => (
        <Card
          key={index}
          className={`cursor-pointer ${
            activeCard === surah.nomor ? "bg-foreground" : "bg-white"
          }`}
          onClick={() => handleCardClick(surah.nomor)}
        >
          <CardHeader className="flex flex-row gap-2">
            <div
              className={`${
                activeCard === surah.nomor
                  ? "bg-background text-foreground"
                  : "bg-foreground text-white"
              } h-[40px] w-[40px] flex rounded-full justify-center items-center text-sm`}
            >
              {surah.nomor}
            </div>
            <div className="flex flex-col">
              <CardTitle
                className={`${
                  activeCard === surah.nomor ? "text-white" : "text-foreground"
                }`}
              >
                {surah.namaLatin}
              </CardTitle>
              <CardDescription>
                {surah.arti} - {surah.jumlahAyat} Ayat
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ListSurah;
