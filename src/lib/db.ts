import { Shalat } from "@/api/shalat";
import Dexie, { type EntityTable } from "dexie";

export const db = new Dexie("QuranKu") as Dexie & {
  jadwalShalatHarian: EntityTable<Shalat, "id">;
  jadwalShalatBulanan: EntityTable<Shalat, "id">;
};

db.version(1).stores({
  jadwalShalatHarian: "++id, lokasi, daerah, jadwal",
  jadwalShalatBulanan: "++id, lokasi, daerah, jadwal",
});
