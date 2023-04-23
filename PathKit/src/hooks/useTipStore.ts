import { create } from "zustand";

interface ITipStore {
  currentTipIndex: number;
  setCurrentTipIndex: (index: number) => void;
}

export const useTipStore = create<ITipStore>((set) => ({
  currentTipIndex: 0,
  setCurrentTipIndex: (index) => {
    console.log("Setting currentTipIndex to", index);
    set({ currentTipIndex: index });
  },
}));
