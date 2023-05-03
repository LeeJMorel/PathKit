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
  getEntitiesById: (entityIds?: string[]) => IEntity[];
  deleteEntity: (entityId: string) => void;
  getPlayerEntities: () => IEntity[];
  getActivePlayerEntities: () => IEntity[];
  updateEntity: (entity: PartialEntity) => IEntity;
  updateOrAddEntity: (entity: PartialEntity) => IEntity;
  resetEntities: () => void;
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
      console.log("debug addEntity:", {
        entity,
        newEntity,
      });

      setEntities([...entities, entity]);
      return entity;
    },
    [setEntities, currentCampaignId, entities]
  );

  const getEntityById = useCallback(
    (entityId?: string): IEntity | undefined => {
      const match = entities.find((e) => e.id === entityId);
      return match;
    },
    [entities]
  );

  const getEntitiesById = useCallback(
    (entityIds?: string[]): IEntity[] => {
      const matches = entities.filter((e) => entityIds?.includes(e.id));
      return matches;
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
    (newEntity: PartialEntity): IEntity => {
      let entity = newEntity;
      const newEntities: IEntity[] = entities.map((e) => {
        if (e.id === entity.id) {
          entity = Object.assign({}, e, entity);
          return entity as IEntity;
        }
        return e;
      });

      setEntities(newEntities);
      return entity as IEntity;
    },
    [entities]
  );

  const updateOrAddEntity = (newEntity: PartialEntity): IEntity => {
    return newEntity.id ? updateEntity(newEntity) : addEntity(newEntity);
  };

  const resetEntities = useCallback((): void => {
    const resetEntities: IEntity[] = entities.map((entity) =>
      Object.assign({}, entity, { initiative: 0 })
    );
    setEntities(resetEntities);
  }, [entities]);

  return {
    entities: entities.filter((n) => n.campaignId === currentCampaignId),
    setEntities,
    addEntity,
    getEntityById,
    getEntitiesById,
    deleteEntity,
    getPlayerEntities,
    getActivePlayerEntities,
    updateEntity,
    updateOrAddEntity,
    resetEntities,
  };
};
