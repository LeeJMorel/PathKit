import { create } from "zustand";
import { persist } from "zustand/middleware";
import deepMerge from "deepmerge";
import { Module } from "../components/modules";

interface IPreferences {
  largeFont: boolean;
  theme: string;
  visibleModules: Record<Module, boolean>;

  selectedPlan: string | number | null;
  selectedNote: string | number | null;
  selectedSearch: string | number | null;
  absentPlayers: (string | number)[];
}

interface IPreferencesStore {
  preferences: IPreferences;
  setPreferences: (preferences: Partial<IPreferences>) => void;
}

//default preferences state
export const defaultPreferences = {
  largeFont: false,
  theme: "parchment",
  visibleModules: {
    TipModule: true,
    DCModule: false,
    DiceModule: true,
    NotesModule: false,
    BinderModule: true,
  },
  selectedPlan: null,
  selectedNote: null,
  selectedSearch: null,
  absentPlayers: [],
};

export const usePreferencesStore = create(
  persist<IPreferencesStore>(
    (set, get) => ({
      preferences: {
        largeFont: false,
        theme: "parchment",
        visibleModules: {
          TipModule: true,
          DCModule: false,
          DiceModule: false,
          NotesModule: false,
          BinderModule: true,
        },
        currentCampaignId: 0,
        selectedPlan: null,
        selectedNote: null,
        selectedSearch: null,
        absentPlayers: [],
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
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState as Partial<IPreferencesStore>),
    }
  )
);
