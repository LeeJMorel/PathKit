import styles from "./View.module.scss";
import React, { useEffect, useState } from "react";
import PlannerCard from "../cards/PlannerCard";
import EntityCard from "../cards/EntityCard";
import AddPlayerCard from "../cards/AddPlayerCard";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";
import { useEntities, usePlans, usePreferencesStore } from "../../hooks";

function CardView() {
  const { getPlayerEntities, getEntityById } = useEntities();

  //get all the player entities, they should always be visible
  const playerEntities = getPlayerEntities();
  const playerCards = playerEntities.map((entity) => (
    <EntityCard key={entity.id} entity={entity} />
  ));

  //if a current plan is selected, spawn entity cards for it
  const { preferences, setPreferences } = usePreferencesStore();
  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(undefined);
  useEffect(
    () => setCurrentPlan(getPlanById(preferences.selectedPlan || undefined)),
    [preferences.selectedPlan, getPlanById]
  );

  const planCards = currentPlan?.entities.map((entity) => (
    <EntityCard key={entity.id} entity={entity} />
  ));

  const initiativeOrder = [
    {
      entity: {},
      roll: 23,
    },
  ].sort((a, z) => a.roll - z.roll);

  return (
    <div className={styles.cardView}>
      <PlannerCard />
      {playerCards}
      {planCards}
      <AddPlayerCard />
    </div>
  );
}

export default CardView;
