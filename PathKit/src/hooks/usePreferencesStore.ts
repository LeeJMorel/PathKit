import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Module } from "../components/modules";

interface IPreferences {
  largeFont: boolean;
  theme: string;
  visibleModules: Record<Module, boolean>;
  currentCampaignId: string | null;

  selectedEntity: string | null;
  selectedPlan: string | null;
  selectedNote: string | null;
  selectedSearch: string | null;
}

interface IPreferencesStore {
  preferences: IPreferences;
  setPreferences: (preferences: Partial<IPreferences>) => void;
}

export const usePreferencesStore = create(
  persist<IPreferencesStore>(
    (set, get) => ({
      preferences: {
        largeFont: false,
        theme: "parchment",
        visibleModules: {
          DCModule: true,
          DiceModule: true,
          NotesModule: false,
          Foo: false,
        },
        currentCampaignId: null,
        selectedPlan: null,
        selectedEntity: null,
        selectedNote: null,
        selectedSearch: null,
      },

      setPreferences: (newPreferences: Partial<IPreferences>): void => {
        const { preferences } = get();
        set({
          preferences: {
            ...preferences,
            ...newPreferences,
          },
        });
      },
    }),
    {
      name: "PathKit-preferences", // unique name
    }
  )
);
