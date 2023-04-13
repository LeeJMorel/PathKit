import React from "react";
import "./App.css";

function Header(props: {
  customFeatures?: any;
  column?: any;
  mode?: any;
  searchResults?: any;
}) {
  // Extract the relevant props
  const { column, mode, searchResults } = props;

  // Conditionally render the header content based on the column
  let headerContent = "";
  if (column === "column1") {
    headerContent = mode === "Encounter" ? "Encounter" : "Exploration";
  } else if (column === "column2") {
    headerContent = "Search";
  } else if (column === "column3") {
    headerContent = "Custom Features: " + props.customFeatures;
  }

  return <div className="Header">{headerContent}</div>;
}

export default Header;
