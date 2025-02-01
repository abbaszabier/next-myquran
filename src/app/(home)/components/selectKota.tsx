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

import { useGetKota } from "@/api/shalat";
import { useSettingsStore } from "@/store/settings";

export function SelectKota() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: kota } = useGetKota();

  const { setKota, setIdKota } = useSettingsStore((state) => state);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? kota?.find((framework) => framework.lokasi === value)?.lokasi
            : "Cari kota..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari kota..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {kota?.map((framework) => (
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
