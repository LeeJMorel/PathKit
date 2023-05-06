import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { IEntity, EntityType } from "../api/model";
import { PartialBy } from "../utilities";

export type PartialEntity = PartialBy<IEntity, "entityId" | "campaignId">;

interface IUseEntities {
  entities: IEntity[];
  setEntities: (entities: IEntity[]) => void;
  addEntity: (entity: PartialEntity) => IEntity;
  getEntityById: (entityId?: string | number) => IEntity | undefined;
  getEntitiesById: (entityIds?: (string | number)[]) => IEntity[];
  deleteEntity: (entityId: string | number) => void;
  getPlayerEntities: () => IEntity[];
  getActivePlayerEntities: () => IEntity[];
  updateEntity: (entity: PartialEntity) => IEntity;
  updateOrAddEntity: (entity: PartialEntity) => IEntity;
  resetEntities: () => void;
}

export const useEntities = (): IUseEntities => {
  const { entities, setEntities, refreshEntities, currentCampaignId } =
    useStore((store) => ({
      entities: store.entities,
      setEntities: store.setEntities,
      refreshEntities: store.refreshEntities,
      currentCampaignId: store.currentCampaignId,
    }));

  // Initial call should refresh stored entities from API
  useEffect(() => {
    refreshEntities();
  }, []);

  const addEntity = useCallback(
    (newEntity: PartialEntity): IEntity => {
      // const entity: IEntity = {
      //   ...newEntity,
      //   entityId: newEntity.entityId || uuid(),
      //   campaignId: newEntity.campaignId || currentCampaignId,
      // } as IEntity;
      // console.log("debug addEntity:", {
      //   entity,
      //   newEntity,
      // });

      // setEntities([...entities, entity]);
      //return entities;
      return {} as IEntity;
    },
    []
    // [setEntities, currentCampaignId, entities]
  );

  const getEntityById = useCallback(
    (entityId?: string | number): IEntity | undefined => {
      const match = entities.find((e) => e.entityId === entityId);
      // return match;
      return undefined;
    },
    [entities]
  );

  const getEntitiesById = useCallback(
    (entityIds?: (string | number)[]): IEntity[] => {
      const matches = entities.filter((e) => entityIds?.includes(e.entityId));
      // return matches;
      return [];
    },
    [entities]
  );

  const deleteEntity = useCallback(
    async (entityId: string | number): Promise<void> => {
      // return await setEntities(entities.filter((e) => e.entityId !== entityId));
    },
    [entities]
  );

  const getPlayerEntities = useCallback((): IEntity[] => {
    return [];
    // return entities.filter((e) => e.entityType === EntityType.Player);
  }, [entities]);

  const getActivePlayerEntities = useCallback((): IEntity[] => {
    return [];
    // return entities.filter((e) => e.entityType === EntityType.Player);
  }, [entities]);

  const updateEntity = useCallback(
    (newEntity: PartialEntity): IEntity => {
      // let entity = newEntity;
      // const newEntities: IEntity[] = entities.map((e) => {
      //   if (e.entityId === entity.entityId) {
      //     entity = Object.assign({}, e, entity);
      //     return entity as IEntity;
      //   }
      //   return e;
      // });

      // setEntities(newEntities);
      // return entity as IEntity;
      return {} as IEntity;
    },
    [entities]
  );

  const updateOrAddEntity = (newEntity: PartialEntity): IEntity => {
    return {} as IEntity;
    // return newEntity.entityId ? updateEntity(newEntity) : addEntity(newEntity);
  };

  const resetEntities = useCallback((): void => {
    // const resetEntities: IEntity[] = entities.map((entity) =>
    //   Object.assign({}, entity, { initiative: 0 })
    // );
    // setEntities(resetEntities);
  }, [entities]);

  return {
    // entities: entities.filter((n) => n.campaignId === currentCampaignId),
    entities,
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
