import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  IEntity,
  IPlan,
  ICampaign,
  INote,
  PartialCampaign,
  PartialEntity,
  PartialNote,
  PartialPlan,
  IRawEntity,
  IRawPlan,
} from "../api/model";
import {
  selectAllRows,
  insertRow,
  selectRowWhere,
  deleteRow,
  updateRow,
} from "../api/database/database";

export interface State {
  currentCampaignId: number;
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
  loadCampaign: (campaignId: number) => Promise<void>;
  insertCampaign: (campaign: PartialCampaign) => Promise<ICampaign | undefined>;
  deleteCampaign: (id: number) => Promise<void>;
  refreshCampaigns: () => Promise<void>;

  insertEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  // updateEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  deleteEntity: (id: number) => Promise<void>;
  refreshEntities: () => Promise<void>;

  insertPlan: (plan: PartialPlan) => Promise<IPlan | undefined>;
  // updatePlan: (plan: PartialPlan) => Promise<IPlan | undefined>;
  deletePlan: (id: number) => Promise<void>;
  refreshPlans: () => Promise<void>;

  insertNote: (note: Partial<INote>) => Promise<INote | undefined>;
  // updateNote: (note: PartialNote) => Promise<INote | undefined>;
  deleteNote: (id: number) => Promise<void>;
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

export const useStore = create<IStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadCampaign: async (campaignId) => {
        const { refreshEntities, refreshNotes, refreshPlans } = get();
        selectRowWhere<ICampaign>("campaign", {
          key: "id",
          oper: "=",
          value: campaignId,
        }).then((result) => {
          if (result && result[0].id) {
            set({ currentCampaignId: campaignId });
            refreshEntities();
            refreshNotes();
            refreshPlans();
          }
        });
      },

      unloadCampaign: () => {
        set(initialState);
      },

      insertCampaign: async (campaign) => {
        const result = await insertRow("campaign", campaign);
        if (result?.lastInsertId) {
          return {
            id: result.lastInsertId,
            ...campaign,
          };
        }
      },

      deleteCampaign: async (id) => {
        const { unloadCampaign, currentCampaignId } = get();
        if (id === currentCampaignId) {
          unloadCampaign();
        }
        deleteRow("campaign", "id", id);
        deleteRow("entity", "campaignId", id);
        deleteRow("plan", "campaignId", id);
        deleteRow("note", "campaignId", id);
      },

      refreshCampaigns: async () => {
        set({ campaignsLoading: true });

        const response = await selectAllRows<ICampaign[]>("campaign", {
          // sort: [["campaignId", "DESC"]],
        });

        if (response) {
          set({ campaigns: response });
        }
        set({ campaignsLoading: false });
      },

      insertEntity: async (newEntity) => {
        const { currentCampaignId, refreshEntities } = get();
        if (currentCampaignId) {
          const entity = {
            ...newEntity,
            campaignId: currentCampaignId,
          };
          const result = await insertRow("entity", entity);
          if (result?.lastInsertId) {
            refreshEntities();
            const newResult = await selectRowWhere<IEntity>("entity", {
              key: "id",
              oper: "=",
              value: result.lastInsertId,
            });
            return newResult && newResult.length > 0 ? newResult[0] : undefined;
          }
        }
      },

      // updateEntity: async (entity) => {
      //   const { refreshEntities } = get();
      //   if (entity.id) {
      //     const result = await updateRow("entity", entity, entity.id);
      //     if (result?.rowsAffected && result.rowsAffected > 0) {
      //       refreshEntities();
      //       const newResult = await selectRowWhere<IEntity>("entity", {
      //         key: "id",
      //         oper: "=",
      //         value: result.lastInsertId,
      //       });
      //       return newResult && newResult.length > 0 ? newResult[0] : undefined;
      //     }
      //   }
      // },

      deleteEntity: async (id) => {
        const { refreshEntities } = get();
        deleteRow("entity", "id", id);
        refreshEntities();
      },

      refreshEntities: async () => {
        const { currentCampaignId } = get();
        set({ entitiesLoading: true });

        const response = await selectRowWhere<IRawEntity>("entity", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["name", "ASC"]],
        });

        if (response) {
          const entities: IEntity[] = response.map((e) => ({
            ...e,
            build: JSON.parse(e.build || "{}"),
            conditions: JSON.parse(e.conditions || "[]"),
          }));
          set({ entities });
        }
        set({ entitiesLoading: false });
      },

      insertPlan: async (newPlan) => {
        const { currentCampaignId, refreshPlans } = get();
        const plan = {
          ...newPlan,
          campaignId: currentCampaignId,
        };
        const result = await insertRow("Plan", plan);
        if (result?.lastInsertId) {
          refreshPlans();
          const newResult = await selectRowWhere<IPlan>("plan", {
            key: "id",
            oper: "=",
            value: result.lastInsertId,
          });
          return newResult && newResult.length > 0 ? newResult[0] : undefined;
        }
      },

      // updatePlan: async (plan) => {
      //   const { refreshPlans } = get();
      //   if (plan.id) {
      //     const result = await updateRow("plan", plan, plan.id);
      //     if (result?.rowsAffected && result.rowsAffected > 0) {
      //       refreshPlans();
      //       const newResult = await selectRowWhere<IPlan>("plan", {
      //         key: "id",
      //         oper: "=",
      //         value: result.lastInsertId,
      //       });
      //       return newResult && newResult.length > 0 ? newResult[0] : undefined;
      //     }
      //   }
      // },

      deletePlan: async (id) => {
        const { refreshPlans } = get();
        deleteRow("plan", "id", id);
        refreshPlans();
      },

      refreshPlans: async () => {
        const { currentCampaignId } = get();
        set({ plansLoading: true });

        const response = await selectRowWhere<IRawPlan>("plan", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["id", "DESC"]],
        });

        if (response) {
          const plans: IPlan[] = response.map((p) => ({
            ...p,
            entities: JSON.parse(p.entities || "[]"),
          }));
          set({ plans });
        }
        set({ plansLoading: false });
      },

      insertNote: async (newNote) => {
        const { currentCampaignId, refreshNotes } = get();
        if (currentCampaignId) {
          const note = {
            ...newNote,
            campaignId: currentCampaignId,
          };
          const result = await insertRow("note", note);
          if (result?.lastInsertId) {
            refreshNotes();
            const newResult = await selectRowWhere<INote>("note", {
              key: "id",
              oper: "=",
              value: result.lastInsertId,
            });
            return newResult && newResult.length > 0 ? newResult[0] : undefined;
          }
        }
      },

      // updateNote: async (note) => {
      //   const { refreshNotes } = get();
      //   if (note.id) {
      //     const result = await insertRow("note", note);
      //     if (result?.rowsAffected && result.rowsAffected > 0) {
      //       refreshNotes();
      //       const newResult = await selectRowWhere<INote>("note", {
      //         key: "id",
      //         oper: "=",
      //         value: note.id,
      //       });
      //       return newResult && newResult.length > 0 ? newResult[0] : undefined;
      //     }
      //   }
      // },

      deleteNote: async (id) => {
        const { refreshNotes } = get();
        deleteRow("note", "id", id);
        refreshNotes();
      },

      refreshNotes: async () => {
        const { currentCampaignId } = get();
        set({ notesLoading: true });

        const response = await selectRowWhere<INote>("note", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["modifiedDate", "DESC"]],
        });

        if (response) {
          set({ notes: response });
        }
        set({ notesLoading: false });
      },
    }),
    {
      name: "PathKit-storage",
      partialize: (state) => ({ currentCampaignId: state.currentCampaignId }),
    }
  )
);
