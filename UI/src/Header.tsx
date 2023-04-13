import React from "react";
import "./App.css";

function Header(props: {
  customFeatures?: string;
  column?: string;
  mode?: string;
  searchResults?: any;
}) {
  // Extract the relevant props
  const { column, mode, searchResults, customFeatures } = props;

  // Conditionally render the header content based on the column
  let headerContent = "";
  if (column === "column1") {
    headerContent = mode === "Encounter" ? "Encounter" : "Exploration";
  } else if (column === "column2") {
    headerContent = "Search";
  } else if (column === "column3") {
    headerContent = customFeatures
      ? customFeatures
          .split(",")
          .map((feature) => feature.replace("Module", ""))
          .filter((feature) => feature !== "Dice")
          .join(" + ")
      : "";
  }

  return <div className="Header">{headerContent}</div>;
}

export default Header;
