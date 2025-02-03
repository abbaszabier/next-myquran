import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface SettingsState {
  qori: string;
  setQori: (qori: string) => void;
  kota: string;
  setKota: (kota: string) => void;
  idKota: number;
  setIdKota: (idKota: number) => void;
  terakhirDibaca: {
    teksArab: string;
    ayat: string;
    namaLatin: string;
    nomor: number;
  };
  setTerakhirDibaca: (terakhirDibaca: {
    teksArab: string;
    ayat: string;
    namaLatin: string;
    nomor: number;
  }) => void;
  activeCard: number;
  setActiveCard: (activeCard: number) => void;
  installed: boolean;
  setInstalled: (installed: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        qori: "01",
        setQori(qori) {
          set({ qori });
        },
        kota: "KOTA JAKARTA",
        setKota(kota) {
          set({ kota });
        },
        idKota: 1301,
        setIdKota(idKota) {
          set({ idKota });
        },
        terakhirDibaca: {
          teksArab: "",
          ayat: "",
          namaLatin: "",
          nomor: 0,
        },
        setTerakhirDibaca(terakhirDibaca) {
          set({ terakhirDibaca });
        },
        activeCard: 1,
        setActiveCard(activeCard) {
          set({ activeCard });
        },
        installed: false,
        setInstalled(installed) {
          set({ installed });
        },
      }),
      {
        name: "settings-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
