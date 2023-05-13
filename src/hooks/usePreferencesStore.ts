import { create } from "zustand";
import { persist } from "zustand/middleware";
import deepMerge from "deepmerge";
import { Module } from "../components/modules";

interface IPreferences {
  largeFont: boolean;
  theme: string;
  visibleModules: Record<Module, boolean>;

  selectedPath: number;
  selectedNoteSheet: number;
  selectedNoteModule: number;
  selectedSearch: string | number | null;
  absentPlayers: number[];
}

interface IPreferencesStore {
  preferences: IPreferences;
  setPreferences: (preferences: Partial<IPreferences>) => void;
}

//default preferences state
export const defaultPreferences: IPreferences = {
  largeFont: false,
  theme: "parchment",
  visibleModules: {
    TipModule: true,
    DCModule: false,
    IncomeModule: false,
    DiceModule: true,
    NotesModule: false,
    BinderModule: true,
  },
  selectedPath: 0,
  selectedNoteSheet: 0,
  selectedNoteModule: 0,
  selectedSearch: null,
  absentPlayers: [],
};

export const usePreferencesStore = create(
  persist<IPreferencesStore>(
    (set, get) => ({
      preferences: defaultPreferences,

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
