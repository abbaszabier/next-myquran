"use client";
import { useEffect, useState } from "react";
import {
  useGetSurah,
  useGetDetailSurahByNomor,
  Surah,
  DetailSurah,
} from "@/api/allSurah";
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
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { activeCard, setActiveCard } = useSettingsStore((state) => state);
  const online = typeof window !== "undefined" ? navigator.onLine : true;

  // List Surah
  const { data, isLoading } = useGetSurah(
    online ? { enabled: online } : { enabled: false }
  );

  useEffect(() => {
    if (online) {
      const saveDataListSurah: Surah[] = data ?? [];

      db.listSurah.bulkPut(saveDataListSurah).then(() => {
        console.log("Data surah berhasil disimpan");
      });
    }
  }, [data, online]);

  const listSurah = useLiveQuery(() => db.listSurah.toArray(), []);

  // Detail Surah
  const { data: detailSurah, isLoading: detailSurahLoading } =
    useGetDetailSurahByNomor(activeCard);

  useEffect(() => {
    if (online && activeCard) {
      if (detailSurah) {
        const saveDataDetailSurah: DetailSurah = detailSurah;
        db.detailSurah.bulkPut([saveDataDetailSurah]).then(() => {
          console.log("Data detail surah berhasil disimpan");
        });
      }
    }
  }, [detailSurah, online, activeCard]);

  const detailSurahFromDb = useLiveQuery(() => db.detailSurah.toArray(), []);

  const detailSurahFilter = detailSurahFromDb?.find(
    (surah) => surah.nomor === activeCard
  );

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
          data={online ? data : listSurah}
          setActiveCard={setActiveCard}
          activeCard={activeCard}
          isLoading={isLoading}
          className="hidden lg:block"
        />
        <DetailSurahQuran
          setActiveCard={setActiveCard}
          data={online ? detailSurah : detailSurahFilter}
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
