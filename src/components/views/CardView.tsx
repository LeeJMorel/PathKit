import styles from "./View.module.scss";
import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import PathPlannerCard from "../cards/PathPlannerCard";
import EntityCard from "../cards/EntityCard";
import { IEntity, IPath } from "../../api/model";
import { useEntities, usePaths, usePreferencesStore } from "../../hooks";
import DragAndDropList from "../dragAndDropList/DragAndDropList";

function CardView() {
  const preferences = usePreferencesStore((store) => store.preferences);
  const { getPlayerEntities, getEntitiesById } = useEntities();
  const playerEntities = getPlayerEntities();
  const activePlayersEntities = playerEntities.filter(
    (entity) => !preferences.absentPlayers.includes(entity.id)
  );
  const [currentEntities, setCurrentEntities] = useState<IEntity[]>(
    activePlayersEntities
  );

  const { getPathById } = usePaths();
  const [currentPath, setCurrentPath] = useState<IPath | undefined>(
    getPathById(preferences.selectedPath || undefined)
  );
  const pathEntities = getEntitiesById(currentPath?.entities);

  useEffect(() => {
    const newPath = getPathById(preferences.selectedPath || undefined);
    setCurrentPath(newPath);
    if (newPath && newPath.id !== currentPath?.id) {
      const newpathEntities = getEntitiesById(newPath.entities);
      setCurrentEntities((prev) => [...prev, ...newpathEntities]);
    }
  }, [preferences.selectedPath, getPathById]);

  useEffect(() => {
    const newEntities = [...activePlayersEntities, ...pathEntities].sort(
      (a, z) => (z.initiative || 0) - (a.initiative || 0)
    );
    if (!isEqual(currentEntities, newEntities)) {
      setCurrentEntities(newEntities);
    }
  }, [activePlayersEntities, pathEntities, currentEntities]);

  return (
    <div className={styles.cardView}>
      <PathPlannerCard className={styles.planCard} />
      <DragAndDropList
        id="card-view-entity-list"
        items={currentEntities}
        itemIdKey="id"
        setItems={setCurrentEntities}
        onRenderItem={(item) => <EntityCard entity={item} />}
        listProps={{
          className: styles.entityList,
        }}
        listItemProps={{
          className: styles.entityListItem,
        }}
      />
    </div>
  );
}

export default CardView;
