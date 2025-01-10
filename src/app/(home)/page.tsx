"use client";

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetSurah, useGetDetailSurahByNomor } from "@/api/allSurah";
import ListSurah from "./components/listSurah";
import DetailSurahQuran from "./components/detailSurah";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(1);
  const { data, isLoading } = useGetSurah();
  const { data: detailSurah, isLoading: detailSurahLoading } =
    useGetDetailSurahByNomor(activeCard);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center bg-white w-full p-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">QuranKu</h1>

          <nav className="flex space-x-4">
            <a href="#quran" className="text-md text-black">
              Quran
            </a>
            <a href="#jadwal-shalat" className="text-md">
              Shalat
            </a>
            <a href="#jadwal-shalat" className="text-md">
              Tersimpan
            </a>
          </nav>
        </div>

        <Settings size={24} />
      </div>

      <div className="grid grid-cols-[22%_78%] flex-grow">
        <ListSurah
          data={data}
          setActiveCard={setActiveCard}
          activeCard={activeCard}
          isLoading={isLoading}
        />
        <DetailSurahQuran
          setActiveCard={setActiveCard}
          data={detailSurah}
          isLoading={detailSurahLoading}
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden"></DialogTitle>
        <CommandInput placeholder="Cari surah..." />
        <CommandList>
          <CommandEmpty>Surah tidak ditemukan</CommandEmpty>
          <CommandGroup heading="Daftar Surah">
            {data?.map((surah) => (
              <CommandItem
                key={surah.nomor}
                onSelect={() => {
                  console.log(`Surah selected: ${surah.nomor}`);
                  setActiveCard(surah.nomor);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                {surah.namaLatin}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
