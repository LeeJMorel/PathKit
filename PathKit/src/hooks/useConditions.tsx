import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IConditions {
  name: string;
  desc: string;
}

interface IConditionsStore {
  conditions: IConditions;
  setConditions: (conditions: IConditions) => void;
}

export const useConditions = create(
  persist<IConditionsStore>(
    (set, get) => ({
      conditions: {
        name: "",
        desc: "",
      },

      setConditions: (conditions: IConditions): void =>
        set({ conditions: conditions }),
    }),
    {
      name: "PathKit-Conditions", // unique name
      // storage: createJSONStorage(() => localStorage),
    }
  )
);
