import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export interface Tafsir {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
  tafsir: {
    ayat: number;
    teks: string;
  }[];
  suratSebelumnya:
    | boolean
    | {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
      };
  suratSelanjutnya:
    | boolean
    | {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
      };
}

export const useGetTafsir = (nomor: number) => {
  return useQuery<Tafsir>({
    queryKey: ["tafsir"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v2/tafsir/${nomor}`);
      return data.data;
    },
  });
};
