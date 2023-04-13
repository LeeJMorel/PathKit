import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
//import { get, set, del } from 'idb-keyval' // can use anything: IndexedDB, Ionic Storage, etc.

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    //return (await get(name)) || null;
    return null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    //await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    //await del(name);
  },
};

export const useStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      //addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "food-storage", // unique name
      storage: createJSONStorage(() => storage),
    }
  )
);
