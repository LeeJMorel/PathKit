import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
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
  executeWithoutForeignKeyConstraint,
} from "../api/database/database";
import { transformRawEntity } from "../utilities";

export interface State {
  currentCampaignId: string;
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
  loadCampaign: (campaignId: string) => Promise<void>;
  insertCampaign: (campaign: PartialCampaign) => Promise<ICampaign | undefined>;
  deleteCampaign: (id: string) => Promise<void>;
  refreshCampaigns: () => Promise<void>;

  insertEntity: (
    entity: PartialEntity | IUpdateEntity,
    campaignId?: string,
    ignoreForeignKeyConstraint?: boolean
  ) => Promise<IEntity | undefined>;
  // updateEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  deleteEntity: (id: string) => Promise<void>;
  refreshEntities: () => Promise<void>;
  getEntityById: (id: string) => Promise<IEntity | undefined>;

  insertPath: (
    path: PartialPath,
    campaignId?: string,
    ignoreForeignKeyConstraint?: boolean
  ) => Promise<IPath | undefined>;
  // updatePath: (path: PartialPath) => Promise<IPath | undefined>;
  deletePath: (id: string) => Promise<void>;
  refreshPaths: () => Promise<void>;

  insertNote: (
    note: Partial<INote>,
    campaignId?: string,
    ignoreForeignKeyConstraint?: boolean
  ) => Promise<INote | undefined>;
  // updateNote: (note: PartialNote) => Promise<INote | undefined>;
  deleteNote: (id: string) => Promise<void>;
  refreshNotes: () => Promise<void>;
}

type IStore = State & Actions;

const initialState: State = {
  currentCampaignId: "",
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
        const id = campaign.id || uuid();
        const result = await insertRow("campaign", {
          id,
          ...campaign,
        });
        if (result?.rowsAffected && result.rowsAffected > 0) {
          await refreshCampaigns();
          const newResult = await selectRowWhere<ICampaign>("campaign", {
            key: "id",
            oper: "=",
            value: id,
          });
          return newResult && newResult.length > 0 ? newResult[0] : undefined;
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

      insertEntity: async (newEntity, cId, ignore) => {
        const { currentCampaignId, refreshEntities } = get();
        const campaignId = cId || currentCampaignId;
        if (campaignId) {
          const id = newEntity.id || uuid();
          const entity = {
            id,
            ...newEntity,
            campaignId,
          };

          const result = await executeWithoutForeignKeyConstraint(
            () => insertRow("entity", entity),
            ignore
          );
          if (result?.rowsAffected && result.rowsAffected > 0) {
            await refreshEntities();
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
      //         value: id,
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

      insertPath: async (newPath, cId, ignore) => {
        const { currentCampaignId, refreshPaths } = get();
        const campaignId = cId || currentCampaignId;
        const id = newPath.id || uuid();
        const path = {
          id,
          ...newPath,
          campaignId,
        };
        const result = await executeWithoutForeignKeyConstraint(
          () => insertRow("path", path),
          ignore
        );
        // const result = await insertRow("path", path);
        if (result?.rowsAffected && result.rowsAffected > 0) {
          await refreshPaths();
          const newResult = await selectRowWhere<IPath>("path", {
            key: "id",
            oper: "=",
            value: id,
          });
          return newResult && newResult.length > 0 ? newResult[0] : undefined;
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
      //         value: id,
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

      insertNote: async (newNote, cId, ignore) => {
        const { currentCampaignId, refreshNotes } = get();
        const campaignId = cId || currentCampaignId;
        if (campaignId) {
          const id = newNote.id || uuid();
          const note = {
            id,
            ...newNote,
            campaignId,
          };

          const result = await executeWithoutForeignKeyConstraint(
            () => insertRow("note", note),
            ignore
          );
          // const result = await insertRow("note", note);
          if (result?.rowsAffected && result.rowsAffected > 0) {
            await refreshNotes();
            const newResult = await selectRowWhere<INote>("note", {
              key: "id",
              oper: "=",
              value: id,
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
