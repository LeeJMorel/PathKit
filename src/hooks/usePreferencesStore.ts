import { create } from "zustand";
import { persist } from "zustand/middleware";
import deepMerge from "deepmerge";
import { Module } from "../components/modules";

interface IPreferences {
  largeFont: boolean;
  theme: string;
  visibleModules: Record<Module, boolean>;
  collapsedModules: Record<Module, boolean>;

  selectedPath: string;
  selectedNoteSheet: string;
  selectedNoteModule: string;
  selectedSearch: string | number | null;
  absentPlayers: string[];

  enableFancyEditor: boolean;
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
    TutorialModule: false,
    DCModule: false,
    IncomeModule: false,
    // DiceModule: true,
    NotesModule: false,
    BinderModule: true,
    ConditionModule: false,
  },
  collapsedModules: {
    TipModule: false,
    TutorialModule: false,
    DCModule: false,
    IncomeModule: false,
    // DiceModule: false,
    NotesModule: false,
    BinderModule: false,
    ConditionModule: false,
  },
  selectedPath: "",
  selectedNoteSheet: "",
  selectedNoteModule: "",
  selectedSearch: null,
  absentPlayers: [],

  enableFancyEditor: true,
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
