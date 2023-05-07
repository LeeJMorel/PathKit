import { useEffect, useCallback } from "react";
import { useStore } from "./useStore";
import { IEntity, PartialEntity } from "../api/model";
import { updateAllRows } from "../api/database";

interface IUseEntities {
  entities: IEntity[];
  addEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  getEntityById: (entityId?: string | number) => IEntity | undefined;
  getEntitiesById: (entityIds?: (string | number)[]) => IEntity[];
  deleteEntity: (entityId: number) => void;
  getPlayerEntities: () => IEntity[];
  getActivePlayerEntities: () => IEntity[];
  updateEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  updateOrAddEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  resetInitiative: () => void;
}

export const useEntities = (): IUseEntities => {
  const {
    entities,
    insertEntity,
    refreshEntities,
    updateEntity,
    deleteEntity,
  } = useStore((store) => ({
    entities: store.entities,
    insertEntity: store.insertEntity,
    updateEntity: store.updateEntity,
    deleteEntity: store.deleteEntity,
    refreshEntities: store.refreshEntities,
    currentCampaignId: store.currentCampaignId,
  }));

  // Initial call should refresh stored entities from API
  useEffect(() => {
    refreshEntities();
  }, []);

  const addEntity = async (
    newEntity: PartialEntity
  ): Promise<IEntity | undefined> => {
    return await insertEntity(newEntity);
  };

  const getEntityById = useCallback(
    (entityId?: string | number): IEntity | undefined => {
      const match = entities.find((e) => e.id === entityId);
      return match;
    },
    [entities]
  );

  const getEntitiesById = useCallback(
    (entityIds?: (string | number)[]): IEntity[] => {
      return entities.filter((e) => entityIds?.includes(e.id));
    },
    [entities]
  );

  const getPlayerEntities = useCallback((): IEntity[] => {
    return [];
    // return entities.filter((e) => e.entityType === EntityType.Player);
  }, [entities]);

  const getActivePlayerEntities = useCallback((): IEntity[] => {
    // return entities.filter((e) => e.entityType === EntityType.Player);
    return [];
  }, [entities]);

  const updateOrAddEntity = async (
    newEntity: PartialEntity
  ): Promise<IEntity | undefined> => {
    if (newEntity.id) {
      return updateEntity(newEntity);
    }
    return addEntity(newEntity);
  };

  const resetInitiative = useCallback((): void => {
    updateAllRows("entity", { initiative: 0 });
  }, [entities]);

  return {
    entities,
    addEntity,
    getEntityById,
    getEntitiesById,
    deleteEntity,
    getPlayerEntities,
    getActivePlayerEntities,
    updateEntity,
    updateOrAddEntity,
    resetInitiative,
  };
};
