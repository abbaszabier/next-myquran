import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DialogAbout from "./dialogAbout";
import DropdownTerakhirBaca from "./dropdownTerakhirBaca";

interface DropdownHeaderProps {
  darkMode: boolean;
  toggleDarkMode: VoidFunction;
}

export default function DropdownNavtop({
  darkMode,
  toggleDarkMode,
}: DropdownHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          aria-label="Custom button"
          className="relative cursor-pointer group overflow-hidden rounded-full bg-background shadow dark:text-gray-200 text-lg font-semibold p-2"
        >
          {/* Background animasi */}
          <span
            className="absolute inset-0 bg-[#051c29] dark:bg-gray-200 
transform 
translate-x-full translate-y-full 
group-hover:translate-x-0 group-hover:translate-y-0 
rounded-full"
          ></span>

          {/* Icon */}
          <span
            className={`relative z-10 group-hover:text-white dark:group-hover:text-black 
`}
          >
            <Settings size="20" className="cursor-pointer " />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`mr-4 mb-2 xs:mr-2 ${
          darkMode
            ? "bg-opacity-80 backdrop-blur-sm text-white"
            : "bg-background bg-opacity-80 backdrop-blur-sm text-[#051c29]"
        }`}
      >
        <DropdownMenuLabel>
          <div className="flex justify-between items-center">
            <p>Dark Mode</p>
            <Switch
              id="airplane-mode"
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
          <DropdownTerakhirBaca />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
          <DialogAbout />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
