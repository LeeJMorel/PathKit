import styles from "./View.module.scss";
import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import PlannerCard from "../cards/PlannerCard";
import EntityCard from "../cards/EntityCard";
import AddPlayerCard from "../cards/AddPlayerCard";
import { IEntity, IPlan } from "../../api/model";
import { useEntities, usePlans, usePreferencesStore } from "../../hooks";
import DragAndDropList from "../dragAndDropList/DragAndDropList";

function CardView() {
  const preferences = usePreferencesStore((store) => store.preferences);
  const { getPlayerEntities } = useEntities();
  const playerEntities = getPlayerEntities();
  const activePlayersEntities = playerEntities.filter(
    (entity) =>
      preferences.activePlayers && preferences.activePlayers.includes(entity.id)
  );
  const [currentEntities, setCurrentEntities] = useState<IEntity[]>(
    activePlayersEntities
  );

  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(
    getPlanById(preferences.selectedPlan || undefined)
  );
  const planEntities = currentPlan?.entities || [];

  useEffect(() => {
    const newPlan = getPlanById(preferences.selectedPlan || undefined);
    setCurrentPlan(newPlan);
    if (newPlan && newPlan.id !== currentPlan?.id) {
      setCurrentEntities((prev) => [...prev, ...newPlan.entities]);
    }
  }, [preferences.selectedPlan, getPlanById]);

  useEffect(() => {
    const newEntities = [...activePlayersEntities, ...planEntities].sort(
      (a, z) => (z.initiative || 0) - (a.initiative || 0)
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
        setItems={setCurrentEntities}
        onRenderItem={(item) => <EntityCard entity={item} />}
        listProps={{
          className: styles.entityList,
        }}
        listItemProps={{
          className: styles.entityListItem,
        }}
      />
      <AddPlayerCard />
    </div>
  );
}

export default CardView;
