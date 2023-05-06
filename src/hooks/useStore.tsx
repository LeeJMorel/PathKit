import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IEntity, IPlan, ICampaign, INote } from "../api/model";
import { selectAll, insert, selectWhere } from "../api/database/database";

export interface State {
  currentCampaignId: string | number;
  campaigns: ICampaign[];
  campaignsLoading: boolean;
  entities: IEntity[];
  entitiesLoading: boolean;
  plans: IPlan[];
  plansLoading: boolean;
  notes: INote[];
  notesLoading: boolean;
}
export interface Actions {
  unloadCampaign: () => void;

  loadCampaign: (campaignId: string | number) => Promise<void>;

  setCampaigns: (campaigns: ICampaign[]) => Promise<void>;

  setEntities: (entities: IEntity[]) => Promise<void>;

  setPlans: (plans: IPlan[]) => Promise<void>;

  setNotes: (notes: INote[]) => Promise<void>;

  refreshCampaigns: () => Promise<void>;

  refreshEntities: () => Promise<void>;

  refreshPlans: () => Promise<void>;

  refreshNotes: () => Promise<void>;
}

type IStore = State & Actions;

const initialState: State = {
  currentCampaignId: 0,
  campaigns: [],
  campaignsLoading: false,
  entities: [],
  entitiesLoading: false,
  plans: [],
  plansLoading: false,
  notes: [],
  notesLoading: false,
};

export const useStore = create(
  persist<IStore>(
    (set, get) => ({
      ...initialState,

      loadCampaign: async (campaignId) => {
        const {
          refreshCampaigns,
          refreshEntities,
          refreshNotes,
          refreshPlans,
        } = get();
        refreshCampaigns();
        set({ currentCampaignId: campaignId });
        refreshEntities();
        refreshNotes();
        refreshPlans();
      },

      unloadCampaign: () => {
        const { refreshCampaigns } = get();
        set(initialState);
        refreshCampaigns();
      },

      setCampaigns: async (campaigns) => {
        const { refreshCampaigns } = get();
        await insert("campaign", campaigns);
        refreshCampaigns();
      },

      setEntities: async (entities) => {
        const { refreshEntities } = get();
        await insert("entity", entities);
        refreshEntities();
      },

      setPlans: async (plans) => {
        const { refreshPlans } = get();
        await insert("plan", plans);
        refreshPlans();
      },

      setNotes: async (notes) => {
        const { refreshNotes } = get();
        await insert("note", notes);
        refreshNotes();
      },

      refreshCampaigns: async () => {
        set({ campaignsLoading: true });

        const response = await selectAll<ICampaign[]>("campaign", {
          sort: [["campaignId", "DESC"]],
        });

        if (response) {
          set({ campaigns: response });
        }
        set({ campaignsLoading: false });
      },

      refreshEntities: async () => {
        const { currentCampaignId } = get();
        set({ entitiesLoading: true });

        const response = await selectWhere<IEntity[]>("entity", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["entityId", "DESC"]],
        });

        if (response) {
          set({ entities: response });
        }
        set({ entitiesLoading: false });
      },

      refreshPlans: async () => {
        const { currentCampaignId } = get();
        set({ plansLoading: true });

        const response = await selectWhere<IPlan[]>("plan", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["planId", "DESC"]],
        });

        if (response) {
          set({ plans: response });
        }
        set({ plansLoading: false });
      },

      refreshNotes: async () => {
        const { currentCampaignId } = get();
        set({ notesLoading: true });

        const response = await selectWhere<INote[]>("note", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["noteId", "DESC"]],
        });

        if (response) {
          set({ notes: response });
        }
        set({ notesLoading: false });
      },
    }),
    {
      name: "PathKit-storage",
    }
  )
);
