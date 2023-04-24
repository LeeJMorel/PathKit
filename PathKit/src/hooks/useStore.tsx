import { v4 as uuid } from "uuid";
import { IEntity, EntityType, IPlan, PlanType } from "../api/model";
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import monster from "../assets/monster.png";
import player from "../assets/knight.png";
// import { get, set, del } from 'idb-keyval' // can use anything: IndexedDB, Ionic Storage, etc.

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

export interface IStore {
  entities: IEntity[];
  entitiesLoading: boolean;
  setEntities: (entities: IEntity[]) => void;
  setEntitiesLoading: (loading: boolean) => void;

  plans: IPlan[];
  plansLoading: boolean;
  setPlans: (plans: IPlan[]) => void;
  setPlansLoading: (loading: boolean) => void;

  refreshEntities: () => void;

  refreshPlans: () => void;
}

export const useStore = create(
  persist<IStore>(
    (set, get) => ({
      entities: [],
      entitiesLoading: false,
      setEntities: (entities) => set({ entities }),
      setEntitiesLoading: (loading) => set({ entitiesLoading: loading }),

      plans: [],
      plansLoading: false,
      setPlans: (plans) => set({ plans }),
      setPlansLoading: (loading) => set({ plansLoading: loading }),

      refreshEntities: () => {
        const { setEntities, setEntitiesLoading } = get();
        setEntitiesLoading(true);

        // fetch from database?
        // const response = await fetch(db)... yada
        // const json = await response.json();
        // setEntities(json)
        setEntitiesLoading(false);
      },

      refreshPlans: async () => {
        const { setPlans, setPlansLoading } = get();
        setPlansLoading(true);

        // fetch from database?
        // const response = await fetch(db)... yada
        // const json = await response.json();
        // setPlans(json)
        setPlansLoading(false);
      },
    }),
    {
      name: "PathKit-storage", // unique name
      // storage: createJSONStorage(() => storage), // TODO store in database, otherwise localStorage by default
    }
  )
);
