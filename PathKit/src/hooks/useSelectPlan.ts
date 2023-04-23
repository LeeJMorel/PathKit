import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISelectedPlan {
  selectedPlanID: string;
}

interface ISelectedPlanStore {
  selectedPlan: ISelectedPlan;
  setSelectedPlan: (selectedPlan: ISelectedPlan) => void;
}

export const useSelectPlan = create(
  persist<ISelectedPlanStore>(
    (set, get) => ({
      selectedPlan: {
        selectedPlanID: "",
      },

      setSelectedPlan: (selectedPlan: ISelectedPlan): void =>
        set({ selectedPlan }),
    }),
    {
      name: "PathKit-Selected-Plan", // unique name
      // storage: createJSONStorage(() => localStorage),
    }
  )
);
