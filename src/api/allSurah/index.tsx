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

export interface Ayat {
  id: string;
  audio: { [key: string]: string };
  nomorAyat?: number;
  teksArab: string;
  teksIndonesia: string;
  teksLatin: string;
  namaLatin?: string;
  nomor?: number;
}

export interface DetailSurah {
  arti: string;
  audioFull: Record<string, string>;
  ayat: Ayat[];
  deskripsi: string;
  jumlahAyat: number;
  nama: string;
  namaLatin: string;
  nomor: number;
  suratSebelumnya:
    | boolean
    | {
        jumlahAyat: number;
        nama: string;
        namaLatin: string;
        nomor: number;
      };
  suratSelanjutnya:
    | boolean
    | {
        jumlahAyat: number;
        nama: string;
        namaLatin: string;
        nomor: number;
      };
  tempatTurun: string;
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
  return useQuery<DetailSurah>({
    queryKey: ["detail-surah", nomor],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v2/surat/${nomor}`);
      return data.data;
    },
  });
};
