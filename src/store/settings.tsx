import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface SettingsState {
  qori: string;
  setQori: (qori: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        qori: "01",
        setQori(qori) {
          set({ qori });
        },
      }),
      {
        name: "settings-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
