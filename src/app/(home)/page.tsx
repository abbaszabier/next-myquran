"use client";
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
import { useSettingsStore } from "@/store/settings";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSurah();
  const { activeCard, setActiveCard } = useSettingsStore((state) => state);
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
      <div className="grid grid-cols-1 lg:grid-cols-[22%_78%] flex-grow">
        <ListSurah
          data={data}
          setActiveCard={setActiveCard}
          activeCard={activeCard}
          isLoading={isLoading}
          className="hidden lg:block"
        />
        <DetailSurahQuran
          setActiveCard={setActiveCard}
          data={detailSurah}
          isLoading={detailSurahLoading}
          activeCard={activeCard}
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
