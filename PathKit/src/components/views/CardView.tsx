import styles from "./View.module.scss";
import React from "react";
import PlannerCard from "../cards/PlannerCard";
import PlannerObject from "../cards/PlannerObject";
import player from "../../assets/knight.png";
import EntityCard from "../cards/EntityCard";
import AddPlayerCard from "../cards/AddPlayerCard";
import { EntityType, IEntity, IPlan, PlanType } from "src/api/model";

function CardView() {
  // Generate entity objects placeholders
  // const entityObject1: IEntity = [
  //   {
  //     image: player,
  //     name: "Name 1",
  //     stats: [0],
  //     hp: [3, 3],
  //     entityType: EntityType.Player,
  //   },
  //   //this is a placeholder, this should change based on user input
  // ];

  // const entityObject2: IEntity = [
  //   {
  //     image: player,
  //     name: "Name 2",
  //     stats: [0],
  //     hp: [3, 3],
  //     entityType: EntityType.Player,
  //   },
  //   //this is a placeholder, this should change based on user input
  // ];

  // const entityObject3: IEntity = [
  //   {
  //     image: player,
  //     name: "Name 3",
  //     stats: [13, 3, 5, 7, 8],
  //     hp: [3, 3],
  //     isEncounter: true,
  //   },
  //   //this is a placeholder, this should change based on user input
  // ];

  // const entityObject4: IEntity = [
  //   {
  //     image: player,
  //     name: "Name 4",
  //     stats: [13, 3, 5, 7, 8],
  //     hp: [0, 3],
  //     isEncounter: true,
  //   },
  //   //this is a placeholder, this should change based on user input
  // ];

  // Generate an array of PlannerObjectProps objects

  return (
    <div className={styles.cardView}>
      <PlannerCard />
      {/* <EntityCard entityObjects={entityObject1} />
      <EntityCard entityObjects={entityObject2} />
      <EntityCard entityObjects={entityObject3} />
      <EntityCard entityObjects={entityObject4} /> */}
      <AddPlayerCard></AddPlayerCard>
    </div>
  );
}

export default CardView;
