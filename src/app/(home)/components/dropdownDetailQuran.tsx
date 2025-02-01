import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EllipsisVertical, Pause, Play } from "lucide-react";
import { DetailSurah } from "@/api/allSurah";
import { SelectAyat } from "./selectAyat";

interface DropdownHeaderProps {
  darkMode: boolean;
  toggleDarkMode: VoidFunction;
  playAudio: VoidFunction;
  isPlaying: boolean;
  onChaneQori: (qori: string) => void;
  data?: DetailSurah;
  getUserNameQori: (qori: string) => string;
  onSelectAyat?: (ayatNumber: string) => void;
}

export default function DropdownDetailQuran({
  darkMode,
  playAudio,
  isPlaying,
  onChaneQori,
  data,
  getUserNameQori,
  onSelectAyat,
}: DropdownHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          aria-label="Custom button"
          className="relative cursor-pointer group overflow-hidden p-2"
        >
          <span
            className={`relative z-10 group-hover:text-white dark:group-hover:text-black 
`}
          >
            <EllipsisVertical size="20" className="cursor-pointer " />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`mr-4 mb-2 xs:mr-2 ${
          darkMode
            ? "bg-[#051c29] bg-opacity-80 backdrop-blur-sm text-white"
            : "bg-background"
        }`}
      >
        <DropdownMenuLabel>
          <Select onValueChange={onChaneQori}>
            <SelectTrigger className="w-[140px]" aria-label="Pilih qori">
              <SelectValue placeholder="Pilih qori" aria-label="Pilih qori" />
            </SelectTrigger>
            <SelectContent className="w-[140px]" aria-label="Pilih qori">
              {Object.keys(data?.audioFull ?? {}).map((item, i) => (
                <SelectItem
                  key={i}
                  value={item}
                  onClick={() => onChaneQori(item)}
                >
                  {getUserNameQori(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <SelectAyat onSelectAyat={onSelectAyat} data={data?.ayat} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex gap-2 items-center">
            <button
              aria-label="Play Audio"
              title="Play Full Audio"
              onClick={playAudio}
              className={`px-2 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md`}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            Play Full
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
