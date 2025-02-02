import { DetailSurah, Surah } from "@/api/allSurah";
import { Shalat } from "@/api/shalat";
import { Tafsir } from "@/api/tafsir";
import Dexie, { type EntityTable } from "dexie";

export const db = new Dexie("QuranKu") as Dexie & {
  jadwalShalatHarian: EntityTable<Shalat, "id">;
  jadwalShalatBulanan: EntityTable<Shalat, "id">;
  listSurah: EntityTable<Surah, "nomor">;
  detailSurah: EntityTable<DetailSurah, "nomor">;
  tafsir: EntityTable<Tafsir, "nomor">;
};

db.version(3).stores({
  jadwalShalatHarian: "++id, lokasi, daerah, jadwal",
  jadwalShalatBulanan: "++id, lokasi, daerah, jadwal",
  listSurah:
    "++id, nomor, nama, namaLatin, jumlahAyat, tempatTurun, arti, deskripsi, audioFull",
  detailSurah:
    "++id, arti, audioFull, ayat, deskripsi, jumlahAyat, nama, namaLatin, nomor, suratSebelumnya, suratSelanjutnya, tempatTurun",
});
