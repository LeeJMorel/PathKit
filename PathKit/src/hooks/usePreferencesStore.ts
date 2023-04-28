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
  activePlayers: string[];
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
          TipModule: true,
          DCModule: false,
          DiceModule: true,
          NotesModule: false,
          BinderModule: false,
        },
        currentCampaignId: null,
        selectedPlan: null,
        selectedEntity: null,
        selectedNote: null,
        selectedSearch: null,
        activePlayers: [],
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

      setCampaignId: (campaignId: string): void => {
        const { setPreferences } = get();
        // clearInitiative(currentCampaignId);
        setPreferences({ currentCampaignId: campaignId });
      },
    }),
    {
      name: "PathKit-preferences", // unique name
    }
  )
);
