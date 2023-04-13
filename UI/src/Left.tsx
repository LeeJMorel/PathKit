import "./App.css";
import React from "react";
import PlannerCard from "./components/left/PlannerCard";
import PlannerObject from "./components/left/PlannerObject";
import monster from "./assets/monster.png";

function Left() {
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
    <div className="Left">
      <PlannerCard plannerObjects={plannerObjects} />
    </div>
  );
}

export default Left;
