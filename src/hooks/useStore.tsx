import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  IEntity,
  IPath,
  ICampaign,
  INote,
  PartialCampaign,
  PartialEntity,
  PartialNote,
  PartialPath,
  IRawEntity,
  IRawPath,
  IUpdateEntity,
} from "../api/model";
import {
  selectAllRows,
  insertRow,
  selectRowWhere,
  deleteRow,
  updateRow,
} from "../api/database/database";
import { transformRawEntity } from "../utilities";

export interface State {
  currentCampaignId: number;
  campaigns: ICampaign[];
  campaignsLoading: boolean;
  entities: IEntity[];
  entitiesLoading: boolean;
  paths: IPath[];
  pathsLoading: boolean;
  notes: INote[];
  notesLoading: boolean;
}

export interface Actions {
  unloadCampaign: () => void;
  loadCampaign: (campaignId: number) => Promise<void>;
  insertCampaign: (campaign: PartialCampaign) => Promise<ICampaign | undefined>;
  deleteCampaign: (id: number) => Promise<void>;
  refreshCampaigns: () => Promise<void>;

  insertEntity: (
    entity: PartialEntity | IUpdateEntity
  ) => Promise<IEntity | undefined>;
  // updateEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  deleteEntity: (id: number) => Promise<void>;
  refreshEntities: () => Promise<void>;
  getEntityById: (id: number) => Promise<IEntity | undefined>;

  insertPath: (path: PartialPath) => Promise<IPath | undefined>;
  // updatePath: (path: PartialPath) => Promise<IPath | undefined>;
  deletePath: (id: number) => Promise<void>;
  refreshPaths: () => Promise<void>;

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
  paths: [],
  pathsLoading: false,
  notes: [],
  notesLoading: false,
};

export const useStore = create<IStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadCampaign: async (campaignId) => {
        const { refreshEntities, refreshNotes, refreshPaths } = get();
        selectRowWhere<ICampaign>("campaign", {
          key: "id",
          oper: "=",
          value: campaignId,
        }).then((result) => {
          if (result && result[0].id) {
            set({ currentCampaignId: campaignId });
            refreshEntities();
            refreshNotes();
            refreshPaths();
          }
        });
      },

      unloadCampaign: () => {
        set(initialState);
      },

      insertCampaign: async (campaign) => {
        const { refreshCampaigns } = get();
        const result = await insertRow("campaign", campaign);
        if (result?.rowsAffected && result.rowsAffected > 0) {
          await refreshCampaigns();
          const id = result.lastInsertId || campaign.id;
          if (id) {
            const newResult = await selectRowWhere<ICampaign>("campaign", {
              key: "id",
              oper: "=",
              value: id,
            });
            return newResult && newResult.length > 0 ? newResult[0] : undefined;
          }
        }
      },

      deleteCampaign: async (id) => {
        const { unloadCampaign, currentCampaignId } = get();
        if (id === currentCampaignId) {
          unloadCampaign();
        }
        deleteRow("campaign", "id", id);
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
          if (result?.rowsAffected && result.rowsAffected > 0) {
            await refreshEntities();
            const id = result.lastInsertId || entity.id;
            if (id) {
              const newResult = await selectRowWhere<IRawEntity>("entity", {
                key: "id",
                oper: "=",
                value: id,
              });
              return newResult && newResult.length > 0
                ? transformRawEntity(newResult[0])
                : undefined;
            }
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
        const { refreshEntities, refreshNotes } = get();
        deleteRow("entity", "id", id);
        refreshEntities();
        refreshNotes(); // notes have dependent entityIds
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
          const entities: IEntity[] = response.map(transformRawEntity);
          set({ entities });
        }
        set({ entitiesLoading: false });
      },

      getEntityById: async (id) => {
        const response = await selectRowWhere<IRawEntity>("entity", {
          key: "id",
          oper: "=",
          value: id,
        });
        if (response) {
          return transformRawEntity(response[0]);
        }
      },

      insertPath: async (newPath) => {
        const { currentCampaignId, refreshPaths } = get();
        const path = {
          ...newPath,
          campaignId: currentCampaignId,
        };
        const result = await insertRow("path", path);
        if (result?.rowsAffected && result.rowsAffected > 0) {
          await refreshPaths();
          const id = result.lastInsertId || path.id;
          if (id) {
            const newResult = await selectRowWhere<IPath>("path", {
              key: "id",
              oper: "=",
              value: result.lastInsertId,
            });
            return newResult && newResult.length > 0 ? newResult[0] : undefined;
          }
        }
      },

      // updatePath: async (path) => {
      //   const { refreshPaths } = get();
      //   if (path.id) {
      //     const result = await updateRow("path", path, path.id);
      //     if (result?.rowsAffected && result.rowsAffected > 0) {
      //       refreshPaths();
      //       const newResult = await selectRowWhere<IPath>("path", {
      //         key: "id",
      //         oper: "=",
      //         value: result.lastInsertId,
      //       });
      //       return newResult && newResult.length > 0 ? newResult[0] : undefined;
      //     }
      //   }
      // },

      deletePath: async (id) => {
        const { refreshPaths } = get();
        deleteRow("path", "id", id);
        refreshPaths();
      },

      refreshPaths: async () => {
        const { currentCampaignId } = get();
        set({ pathsLoading: true });

        const response = await selectRowWhere<IRawPath>("path", {
          key: "campaignId",
          oper: "=",
          value: currentCampaignId,
          sort: [["id", "DESC"]],
        });

        if (response) {
          const paths: IPath[] = response.map((p) => ({
            ...p,
            entities: JSON.parse(p.entities || "[]"),
          }));
          set({ paths });
        }
        set({ pathsLoading: false });
      },

      insertNote: async (newNote) => {
        const { currentCampaignId, refreshNotes } = get();
        if (currentCampaignId) {
          const note = {
            ...newNote,
            campaignId: currentCampaignId,
          };
          const result = await insertRow("note", note);
          if (result?.rowsAffected && result.rowsAffected > 0) {
            await refreshNotes();
            const id = result.lastInsertId || note.id;
            if (id) {
              const newResult = await selectRowWhere<INote>("note", {
                key: "id",
                oper: "=",
                value: result.lastInsertId,
              });
              return newResult && newResult.length > 0
                ? newResult[0]
                : undefined;
            }
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
        const { refreshNotes, refreshEntities } = get();
        deleteRow("note", "id", id);
        refreshNotes();
        refreshEntities(); // Entities have dependent noteIds
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
