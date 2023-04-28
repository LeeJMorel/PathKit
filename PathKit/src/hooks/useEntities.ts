import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { IEntity, EntityType } from "../api/model";
import { PartialBy } from "../utilities";

export type PartialEntity = PartialBy<IEntity, "id" | "campaignId">;

interface IUseEntities {
  entities: IEntity[];
  setEntities: (entities: IEntity[]) => void;
  addEntity: (entity: PartialEntity) => IEntity;
  getEntityById: (entityId?: string) => IEntity | undefined;
  deleteEntity: (entityId: string) => void;
  getPlayerEntities: () => IEntity[];
  getActivePlayerEntities: () => IEntity[];
  updateEntity: (entity: PartialEntity) => void;
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
    (newEntity: PartialEntity): IEntity => {
      const entity: IEntity = {
        ...newEntity,
        id: newEntity.id || uuid(),
        campaignId: newEntity.campaignId || currentCampaignId,
      } as IEntity;

      setEntities([...entities, entity]);
      return entity;
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

  const getActivePlayerEntities = useCallback((): IEntity[] => {
    return entities.filter(
      (e) => e.entityType === EntityType.Player && e.isActive
    );
  }, [entities]);

  const updateEntity = useCallback(
    (newEntity: PartialEntity): void => {
      const newEntities: IEntity[] = entities.map((entity) =>
        entity.id === newEntity.id
          ? Object.assign({}, entity, newEntity)
          : entity
      );
      setEntities(newEntities);
    },
    [entities]
  );

  return {
    entities,
    setEntities,
    addEntity,
    getEntityById,
    deleteEntity,
    getPlayerEntities,
    getActivePlayerEntities,
    updateEntity,
  };
};
