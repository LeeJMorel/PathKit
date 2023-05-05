import styles from "./View.module.scss";
import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import PlannerCard from "../cards/PlannerCard";
import EntityCard from "../cards/EntityCard";
import { IEntity, IPlan } from "../../api/model";
import { useEntities, usePlans, usePreferencesStore } from "../../hooks";
import DragAndDropList from "../dragAndDropList/DragAndDropList";

function CardView() {
  const preferences = usePreferencesStore((store) => store.preferences);
  const { getPlayerEntities, getEntitiesById } = useEntities();
  const playerEntities = getPlayerEntities();
  const activePlayersEntities = playerEntities.filter(
    (entity) => !preferences.absentPlayers.includes(entity.entityId)
  );
  const [currentEntities, setCurrentEntities] = useState<IEntity[]>(
    activePlayersEntities
  );

  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(
    getPlanById(preferences.selectedPlan || undefined)
  );
  const planEntities = getEntitiesById(currentPlan?.planEntities);

  useEffect(() => {
    const newPlan = getPlanById(preferences.selectedPlan || undefined);
    setCurrentPlan(newPlan);
    if (newPlan && newPlan.planId !== currentPlan?.planId) {
      const newPlanEntities = getEntitiesById(newPlan.planEntities);
      setCurrentEntities((prev) => [...prev, ...newPlanEntities]);
    }
  }, [preferences.selectedPlan, getPlanById]);

  useEffect(() => {
    const newEntities = [...activePlayersEntities, ...planEntities].sort(
      (a, z) => (z.entityInitiative || 0) - (a.entityInitiative || 0)
    );
    if (!isEqual(currentEntities, newEntities)) {
      setCurrentEntities(newEntities);
    }
  }, [activePlayersEntities, planEntities, currentEntities]);

  return (
    <div className={styles.cardView}>
      <PlannerCard className={styles.planCard} />
      <DragAndDropList
        id="card-view-entity-list"
        items={currentEntities}
        itemIdKey="entityId"
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
