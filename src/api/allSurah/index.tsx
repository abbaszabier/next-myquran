// hooks/useSurah.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
}

export const useGetSurah = () => {
  return useQuery<Surah[]>({
    queryKey: ["surah"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v2/surat");
      return data.data;
    },
  });
};

export const useGetDetailSurahByNomor = (nomor: number) => {
  return useQuery<Surah>({
    queryKey: ["surah", nomor],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v2/surat/${nomor}`);
      return data.data;
    },
  });
};
