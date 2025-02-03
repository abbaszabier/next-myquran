"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Kota, useGetKota } from "@/api/shalat";
import { useSettingsStore } from "@/store/settings";
import { useEffect } from "react";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export function SelectKota() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const online = typeof window !== "undefined" ? navigator.onLine : true;

  const { data: kota } = useGetKota({
    enabled: online,
  });

  const listKotaFromDb = useLiveQuery(() => db.kota.toArray(), []);

  useEffect(() => {
    if (online && kota) {
      const saveDataListKota: Kota[] = kota ?? [];

      // Cek apakah data sudah ada di IndexedDB
      db.kota.count().then((count) => {
        if (count === 0) {
          // Jika belum ada data, simpan data baru
          db.kota.bulkPut(saveDataListKota).then(() => {
            console.log("Data kota berhasil disimpan");
          });
        } else {
          console.log("Data kota sudah ada, tidak perlu disimpan lagi");
        }
      });
    }
  }, [kota, online]);

  const filterData = online ? kota : listKotaFromDb;

  const { setKota, setIdKota } = useSettingsStore((state) => state);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Kota"
          aria-labelledby="select-kota"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? filterData?.find((framework) => framework.lokasi === value)
                ?.lokasi
            : "Cari kota..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari kota..." className="h-9" />
          <CommandList>
            <CommandEmpty>Kota tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {filterData?.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.lokasi}
                  onSelect={() => {
                    setValue(framework.lokasi);
                    setKota(framework.lokasi);
                    setIdKota(framework.id);
                    setOpen(false);
                  }}
                >
                  {framework.lokasi}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.lokasi ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
