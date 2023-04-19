import styles from "./App.module.scss";
import React from "react";
import PlannerCard from "./components/cards/PlannerCard";
import PlannerObject from "./components/cards/PlannerObject";
import monster from "./assets/monster.png";
import player from "./assets/knight.png";
import EntityCard from "./components/cards/EntityCard";

//this is a placeholder until the store is set up
export interface EntityObjectProps {
  image: string; //an image for each object added
  name: string; //a name for each object added (we can use this to search for card data, i.e. Cow)
  stats: number[]; //associated stats
  hp: number[]; //2 numbers, current hp, and total hp
  isEncounter: boolean; //indicate combat
}

function CardView() {
  // Generate entity objects placeholders
  const entityObject1 = [
    {
      image: player,
      name: "Name 1",
      stats: [0],
      hp: [3, 3],
      isEncounter: false,
    },
    //this is a placeholder, this should change based on user input
  ];

  const entityObject2 = [
    {
      image: player,
      name: "Name 2",
      stats: [0],
      hp: [3, 3],
      isEncounter: false,
    },
    //this is a placeholder, this should change based on user input
  ];

  const entityObject3 = [
    {
      image: player,
      name: "Name 3",
      stats: [13, 3, 5, 7, 8],
      hp: [3, 3],
      isEncounter: true,
    },
    //this is a placeholder, this should change based on user input
  ];

  const entityObject4 = [
    {
      image: player,
      name: "Name 4",
      stats: [13, 3, 5, 7, 8],
      hp: [0, 3],
      isEncounter: true,
    },
    //this is a placeholder, this should change based on user input
  ];

  // Generate an array of PlannerObjectProps objects
  const plannerObjects = [
    {
      title: "Title 1",
      images: [monster, monster],
      names: ["Name 1", "Name 2"],
      isEncounter: true,
    },
    {
      title: "Title 2",
      images: [monster],
      names: ["Name 3"],
      isEncounter: false,
    },
    {
      title: "Title 3",
      images: [monster, monster, monster, monster, monster],
      names: ["Name 4", "Name 5", "Name 6", "Name 7", "Name 8"],
      isEncounter: true,
    },
    {
      title: "Title 4",
      images: [monster, monster, monster],
      names: ["Name 9", "Name 10", "Name 11"],
      isEncounter: false,
    },
    {
      title: "Title 5",
      images: [monster],
      names: ["Name 3"],
      isEncounter: false,
    },
    {
      title: "Title 6",
      images: [monster],
      names: ["Name 3"],
      isEncounter: false,
    },
    // Add more objects as needed
    //this is a placeholder, this should change based on user input
  ];

  return (
    <div className={styles.cardView}>
      <PlannerCard plannerObjects={plannerObjects} />
      <EntityCard entityObjects={entityObject1} />
      <EntityCard entityObjects={entityObject2} />
      <EntityCard entityObjects={entityObject3} />
      <EntityCard entityObjects={entityObject4} />
    </div>
  );
}

export default CardView;
