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
  const [isAddEntityMenuOpen, setAddEntityMenuOpen] = React.useState(false);
  const [isAddPlanMenuOpen, setAddPlanMenuOpen] = React.useState(false);

  // Handle close button click
  const handleButtonClick = (isEncounter: boolean) => {
    if (mode === "Encounter") {
      // Call the parent component's logic for 'close' button click
      // Pass isEncounter value to indicate if it's an encounter or not
      console.log("isEncounter:", isEncounter);
    }
  };

  // Conditionally render the header content based on the column
  let headerContent: React.ReactNode = null;
  if (column === "column1") {
    if (mode === "Encounter") {
      headerContent = (
        <>
          <div className="Title">Encounter</div>
        </>
      );
    } else {
      headerContent = (
        <>
          <div className="Title">Exploration</div>
        </>
      );
    }
  } else if (column === "column2") {
    headerContent = "Search";
  } else if (column === "column3") {
    headerContent = (
      <>
        {customFeatures
          ? customFeatures
              .split(",")
              .map((feature) => feature.replace("Module", ""))
              .filter((feature) => feature !== "Dice")
              .join(" + ")
          : ""}
      </>
    );
  }

  return <div className="Header">{headerContent}</div>;
}

export default Header;
