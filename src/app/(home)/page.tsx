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
import { redirect } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { activeCard, setActiveCard } = useSettingsStore((state) => state);
  const online = typeof window !== "undefined" ? navigator.onLine : true;

  // List Surah
  const { data, isLoading } = useGetSurah(
    online ? { enabled: online } : { enabled: false }
  );
  const listSurahFromDb = useLiveQuery(() => db.listSurah.toArray(), []);

  useEffect(() => {
    if (online && data) {
      const saveDataListSurah: Surah[] = data ?? [];

      // Cek apakah data sudah ada di IndexedDB
      db.listSurah.count().then((count) => {
        if (count === 0) {
          // Jika belum ada data, simpan data baru
          db.listSurah.bulkPut(saveDataListSurah).then(() => {
            console.log("Data surah berhasil disimpan");
          });
        } else {
          console.log("Data surah sudah ada, tidak perlu disimpan lagi");
        }
      });
    }
  }, [data, online]);

  // Detail Surah
  const { data: detailSurah, isLoading: detailSurahLoading } =
    useGetDetailSurahByNomor(activeCard);

  const detailSurahFromDb = useLiveQuery(() => db.detailSurah.toArray(), []);
  const isExistData = detailSurahFromDb?.some(
    (surah) => surah.nomor === activeCard
  );

  const handleUndefinedIsExistData =
    typeof isExistData === "undefined" ? true : isExistData;

  useEffect(() => {
    if (online && activeCard && !handleUndefinedIsExistData) {
      if (detailSurah) {
        const saveDataDetailSurah: DetailSurah = detailSurah;
        db.detailSurah.bulkPut([saveDataDetailSurah]).then(() => {
          console.log("Data detail surah berhasil disimpan");
        });
      }
    }
  }, [detailSurah, online, activeCard, handleUndefinedIsExistData]);

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

  // jika offline dan data belum tersedia di IndexedDB redirect ke halaman offline
  if (!online && !handleUndefinedIsExistData) {
    redirect("/offline");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-[22%_78%] flex-grow">
        <ListSurah
          data={online ? data : listSurahFromDb}
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
