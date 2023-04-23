import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IPreferences {
  largeFont: boolean;
  theme: string;
  visibleModules: string;
}

interface IPreferencesStore {
  preferences: IPreferences;
  setPreferences: (preferences: IPreferences) => void;
}

export const usePreferenceStore = create(
  persist<IPreferencesStore>(
    (set, get) => ({
      preferences: {
        largeFont: false,
        theme: "parchment",
        visibleModules: "DCModule,DiceModule",
      },

      setPreferences: (preferences: IPreferences): void => set({ preferences }),
    }),
    {
      name: "PathKit-preferences", // unique name
      // storage: createJSONStorage(() => localStorage),
    }
  )
);
