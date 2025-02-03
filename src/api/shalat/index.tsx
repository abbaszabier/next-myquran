import { useQuery } from "@tanstack/react-query";
import axiosShalat from "../axios/shalat";

export interface Jadwal {
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
}

export interface Shalat {
  id: number;
  lokasi: string;
  daerah: string;
  jadwal: Jadwal;
}

export interface Kota {
  id: number;
  lokasi: string;
}

export const useGetShalatBulanan = (
  idKota: number,
  tahun: number,
  bulan: number,
  options: { enabled: boolean }
) => {
  return useQuery<Shalat>({
    queryKey: ["shalatBulanan", idKota, tahun, bulan],
    queryFn: async () => {
      const response = await axiosShalat.get(
        `/sholat/jadwal/${idKota}/${tahun}/${bulan}`
      );

      return response.data.data;
    },
    ...options,
  });
};

export const useGetShalatHarian = (
  idKota: number,
  tahun: number,
  bulan: number,
  tanggal: number,
  options: { enabled: boolean }
) => {
  return useQuery<Shalat>({
    queryKey: ["shalatHarian", idKota, tahun, bulan, tanggal],
    queryFn: async () => {
      const response = await axiosShalat.get(
        `/sholat/jadwal/${idKota}/${tahun}/${bulan}/${tanggal}`
      );

      return response.data.data;
    },
    ...options,
  });
};

export const useGetKota = (options: { enabled: boolean }) => {
  return useQuery<Kota[]>({
    queryKey: ["kota"],
    queryFn: async () => {
      const response = await axiosShalat.get("/sholat/kota/semua");

      return response.data.data;
    },
    ...options,
  });
};
