import { useEffect, useCallback } from "react";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import {
  IEntity,
  PartialEntity,
  EntityType,
  IUpdateEntity,
} from "../api/model";
import { updateAllRows } from "../api/database";
import useBoolean from "./useBoolean";

interface IUseEntities {
  entities: IEntity[];
  getEntityById: (entityId?: number) => IEntity | undefined;
  getEntitiesById: (entityIds?: number[]) => IEntity[];
  deleteEntity: (entityId: number) => void;
  getPlayerEntities: () => IEntity[];
  getActivePlayerEntities: () => IEntity[];
  updateOrAddEntity: (entity: PartialEntity) => Promise<IEntity | undefined>;
  updateEntityById: (entity: IUpdateEntity) => Promise<IEntity | undefined>;
  resetInitiative: () => void;
}

export const useEntities = (): IUseEntities => {
  const { value: mounted, setTrue: setMountedTrue } = useBoolean(false);
  const { entities, insertEntity, refreshEntities, deleteEntity } = useStore(
    (store) => ({
      entities: store.entities,
      insertEntity: store.insertEntity,
      deleteEntity: store.deleteEntity,
      refreshEntities: store.refreshEntities,
      getEntityById: store.getEntityById,
      currentCampaignId: store.currentCampaignId,
    })
  );
  const { preferences, setPreferences } = usePreferencesStore();

  // Initial call should refresh stored entities from API
  useEffect(() => {
    if (!mounted && entities.length < 1) {
      refreshEntities();
      setMountedTrue();
    }
  }, [mounted, entities]);

  const getEntityById = useCallback(
    (entityId?: number): IEntity | undefined => {
      const match = entities.find((e) => e.id === Number(entityId));
      return match;
    },
    [entities]
  );

  const getEntitiesById = useCallback(
    (entityIds?: (string | number)[]): IEntity[] => {
      return entities.filter((e) => entityIds?.includes(Number(e.id)));
    },
    [entities]
  );

  const getPlayerEntities = useCallback((): IEntity[] => {
    return entities.filter((e) => e.type === EntityType.Player);
  }, [entities]);

  const getActivePlayerEntities = useCallback((): IEntity[] => {
    return entities.filter(
      (e) =>
        e.type === EntityType.Player &&
        !preferences.absentPlayers.includes(e.id)
    );
  }, [entities]);

  const updateOrAddEntity = async (
    newEntity: PartialEntity
  ): Promise<IEntity | undefined> => {
    return await insertEntity(newEntity);
  };

  const updateEntityById = async (
    newEntity: IUpdateEntity
  ): Promise<IEntity | undefined> => {
    return await insertEntity(newEntity);
  };

  const resetInitiative = useCallback((): void => {
    updateAllRows("entity", { initiative: 0 });
  }, [entities]);

  return {
    entities,
    getEntityById,
    getEntitiesById,
    deleteEntity,
    getPlayerEntities,
    getActivePlayerEntities,
    updateEntityById,
    updateOrAddEntity,
    resetInitiative,
  };
};
