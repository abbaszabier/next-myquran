"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface copyProps {
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

export function DropdownCopy({
  teksArab,
  teksLatin,
  teksIndonesia,
}: copyProps) {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Berhasil!", {
      description: "Teks berhasil disalin",
      action: {
        label: <Check size={16} />,
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Copy"
          title="Copy"
          className="px-2 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transition duration-200 hover:shadow-md hover:bg-neutral-100"
        >
          <Copy size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mx-4">
        <DropdownMenuLabel>Pilih Copy</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => copyText(teksArab)}>
            Copy text arab
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => copyText(teksLatin)}>
            Copy text latin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => copyText(teksIndonesia)}>
            Copy text indonesia
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
