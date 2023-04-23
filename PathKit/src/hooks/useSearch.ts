import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISearch {
  ID: string;
}

interface ISearchStore {
  search: ISearch;
  setSearch: (search: ISearch) => void;
}

export const useSearch = create(
  persist<ISearchStore>(
    (set, get) => ({
      search: {
        ID: "",
      },

      setSearch: (search: ISearch): void => set({ search: search }),
    }),
    {
      name: "PathKit-Search", // unique name
      // storage: createJSONStorage(() => localStorage),
    }
  )
);
