import styles from "./View.module.scss";
import React from "react";
import PlannerCard from "../cards/PlannerCard";
import { v4 as uuid } from "uuid";
import player from "../../assets/knight.png";
import EntityCard from "../cards/EntityCard";
import AddPlayerCard from "../cards/AddPlayerCard";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";
import { useEntities } from "../../hooks";

function CardView() {
  const { getPlayerEntities } = useEntities();

  const playerEntities = getPlayerEntities();

  const entityCards = playerEntities.map((entity: IEntity) => (
    <EntityCard key={entity.id} entities={[entity]} />
  ));

  return (
    <div className={styles.cardView}>
      <PlannerCard />
      {entityCards}
      <AddPlayerCard />
    </div>
  );
}

export default CardView;
