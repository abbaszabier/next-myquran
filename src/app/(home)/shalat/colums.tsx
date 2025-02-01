"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Jadwal = {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
};

export const columns: ColumnDef<Jadwal>[] = [
  {
    accessorKey: "tanggal",
    header: "Tanggal",
  },
  {
    accessorKey: "imsak",
    header: "Imsak",
  },
  {
    accessorKey: "subuh",
    header: "Subuh",
  },
  {
    accessorKey: "terbit",
    header: "Terbit",
  },
  {
    accessorKey: "dhuha",
    header: "Dhuha",
  },
  {
    accessorKey: "dzuhur",
    header: "Dzuhur",
  },
  {
    accessorKey: "ashar",
    header: "Ashar",
  },
  {
    accessorKey: "maghrib",
    header: "Maghrib",
  },
  {
    accessorKey: "isya",
    header: "Isya",
  },
];
