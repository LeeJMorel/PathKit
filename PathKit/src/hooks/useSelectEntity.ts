import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISelectedEntity {
  ID: string;
}

interface ISelectedEntityStore {
  selectedEntity: ISelectedEntity;
  setSelectedEntity: (selectedEntity: ISelectedEntity) => void;
}

export const useSelectEntity = create(
  persist<ISelectedEntityStore>(
    (set, get) => ({
      selectedEntity: {
        ID: "",
      },

      setSelectedEntity: (selectedEntity: ISelectedEntity): void =>
        set({ selectedEntity: selectedEntity }),
    }),
    {
      name: "PathKit-Selected-Entity", // unique name
      // storage: createJSONStorage(() => localStorage),
    }
  )
);
