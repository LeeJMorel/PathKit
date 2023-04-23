import styles from "./View.module.scss";
import React from "react";
import PlannerCard from "../cards/PlannerCard";
import { v4 as uuid } from "uuid";
import player from "../../assets/knight.png";
import EntityCard from "../cards/EntityCard";
import AddPlayerCard from "../cards/AddPlayerCard";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";

function CardView() {
  //placeholder, SQL query for all type=player
  const generatePlayer = (): IEntity => {
    const hp = Math.floor(Math.random() * 100) + 10;
    return {
      image: player,
      name: uuid(),
      id: uuid(),
      stats: {
        field1: Math.floor(Math.random() * 10) + 1,
        field2: Math.floor(Math.random() * 10) + 1,
        field3: Math.floor(Math.random() * 10) + 1,
        field4: Math.floor(Math.random() * 10) + 1,
        field5: Math.floor(Math.random() * 10) + 1,
      },
      hp: [hp, hp],
      entityType: EntityType.Player,
    };
  };

  const entityCards = [];
  for (let i = 0; i < 4; i++) {
    const player = generatePlayer();
    entityCards.push(<EntityCard key={player.id} entities={[player]} />);
  }

  return (
    <div className={styles.cardView}>
      <PlannerCard />
      {entityCards}
      <AddPlayerCard></AddPlayerCard>
    </div>
  );
}

export default CardView;
