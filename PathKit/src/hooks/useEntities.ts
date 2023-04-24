import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { IEntity, EntityType } from "../api/model";

interface IUseEntities {
  entities: IEntity[];
  setEntities: (entities: IEntity[]) => void;
  addEntity: (entity: Omit<IEntity, "id" | "campaignId">) => void;
  getEntityById: (entityId?: string) => IEntity | undefined;
  deleteEntity: (entityId: string) => void;
  getPlayerEntities: () => IEntity[];
}

export const useEntities = (): IUseEntities => {
  const { entities, setEntities, refreshEntities } = useStore((store) => ({
    entities: store.entities,
    setEntities: store.setEntities,
    refreshEntities: store.refreshEntities,
  }));
  const currentCampaignId = usePreferencesStore(
    (store) => store.preferences.currentCampaignId
  );

  // Initial call should refresh stored entities from API
  useEffect(() => {
    refreshEntities();
  }, []);

  const addEntity = useCallback(
    (newEntity: Omit<IEntity, "id" | "campaignId">): void => {
      const entity: IEntity = {
        ...newEntity,
        id: uuid(),
        campaignId: currentCampaignId, // TODO get campaignId from high level
      } as IEntity;

      return setEntities([...entities, entity]);
    },
    [setEntities, currentCampaignId]
  );

  const getEntityById = useCallback(
    (entityId?: string): IEntity | undefined => {
      const matches = entities.filter((e) => e.id === entityId);
      if (matches.length) {
        return matches[0];
      }
    },
    [entities]
  );

  const deleteEntity = useCallback(
    (entityId: string): void => {
      return setEntities(entities.filter((e) => e.id !== entityId));
    },
    [entities]
  );

  const getPlayerEntities = useCallback((): IEntity[] => {
    return entities.filter((e) => e.entityType === EntityType.Player);
  }, [entities]);

  return {
    entities,
    setEntities,
    addEntity,
    getEntityById,
    deleteEntity,
    getPlayerEntities,
  };
};
