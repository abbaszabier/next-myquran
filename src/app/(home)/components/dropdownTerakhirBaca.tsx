import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettingsStore } from "@/store/settings";
import { ArrowUpFromLine } from "lucide-react";
import React from "react";

export default function DropdownTerakhirBaca() {
  const { terakhirDibaca, setActiveCard } = useSettingsStore((state) => state);

  const jumpToLastRead = () => {
    setActiveCard(terakhirDibaca.nomor);
    const element = document.getElementById(`ayat-ayat-${terakhirDibaca.ayat}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-md">Terakhir Baca</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-16">
        <DropdownMenuGroup>
          {terakhirDibaca.namaLatin ? (
            <DropdownMenuItem
              className="cursor-pointer text-black dark:text-white"
              onClick={jumpToLastRead}
            >
              <div className="flex items-center justify-between w-full text-black dark:text-white">
                <div className="flex flex-col">
                  <span className="text-sm">{terakhirDibaca.namaLatin}</span>
                  <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                    Terakhir dibaca: Ayat {terakhirDibaca.ayat}
                  </span>
                </div>

                <ArrowUpFromLine size={16} />
              </div>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="text-muted-foreground dark:text-muted-foreground">
              Belum ada ayat terakhir dibaca
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
