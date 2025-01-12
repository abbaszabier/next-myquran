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
import { Ayat } from "@/api/allSurah";

interface SelectAyatProps {
  data: Ayat[] | undefined;
  onSelectAyat?: (ayatNumber: string) => void;
}

export function SelectAyat({ onSelectAyat, data }: SelectAyatProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const verses = data?.map((verse) => ({
    value: verse.nomorAyat?.toString() || "",
    label: verse.nomorAyat?.toString() || "",
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? verses?.find((verse) => verse.value === value)?.label ??
              "Select ayat"
            : "Select ayat"}
          <ChevronsUpDown className="opacity-50 w-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search ayat..." />
          <CommandList className="w-full">
            <CommandEmpty>No ayat found.</CommandEmpty>
            <CommandGroup className="w-full">
              {verses?.map((verse) => (
                <CommandItem
                  key={verse.value}
                  value={verse.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (onSelectAyat) {
                      onSelectAyat(`ayat-${currentValue}`);
                    }
                  }}
                >
                  {verse.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === verse.value
                        ? "w-full opacity-100"
                        : "w-full opacity-0"
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
