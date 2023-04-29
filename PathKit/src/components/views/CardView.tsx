import styles from "./View.module.scss";
import React, { useEffect, useState, useCallback } from "react";
import PlannerCard from "../cards/PlannerCard";
import EntityCard from "../cards/EntityCard";
import AddPlayerCard from "../cards/AddPlayerCard";
import { IEntity, IPlan } from "../../api/model";
import { useEntities, usePlans, usePreferencesStore } from "../../hooks";
import DragAndDropList from "../dragAndDropList/DragAndDropList";

function CardView() {
  const preferences = usePreferencesStore((store) => store.preferences);
  const { getPlayerEntities } = useEntities();
  //get all the player entities, they should always be visible
  const playerEntities = getPlayerEntities();
  const activePlayersEntities = playerEntities.filter(
    (entity) =>
      preferences.activePlayers && preferences.activePlayers.includes(entity.id)
  );
  const [currentEntities, setCurrentEntities] = useState<IEntity[]>(
    activePlayersEntities
  );

  // if a current plan is selected, spawn entity cards for it
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
    const newEntities = [...activePlayersEntities, ...planEntities];
    if (currentEntities.length !== newEntities.length) {
      setCurrentEntities(newEntities);
    }
  }, [activePlayersEntities, planEntities]);

  // const initiativeOrder = [
  //   {
  //     entity: {},
  //     roll: 23,
  //   },
  // ].sort((a, z) => a.roll - z.roll);

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
        // onDragEnd={(result) => console.log(result)}
      />
      <AddPlayerCard />
    </div>
  );
}

export default CardView;
