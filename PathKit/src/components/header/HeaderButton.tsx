import React from "react";

interface HeaderButtonProps {
  type: "close" | "addEntity" | "addPlan";
  onClick: (isEncounter: boolean) => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ type, onClick }) => {
  const handleButtonClick = () => {
    if (type === "close") {
      onClick(false);
    } else if (type === "addEntity") {
      // Open AddEntityMenu
      // Implement the logic to show/hide the AddEntityMenu component here
    } else if (type === "addPlan") {
      // Open AddPlanMenu
      // Implement the logic to show/hide the AddPlanMenu component here
    }
  };

  let buttonText = "";
  if (type === "close") {
    buttonText = "x";
  } else {
    buttonText = "+";
  }

  return (
    <button
      onClick={handleButtonClick}
      style={{
        borderRadius: "100%",
        width: "20px",
        height: "20px",
        backgroundColor: "gray",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        outline: "none",
        border: "none",
        fontSize: "0.8em",
        fontWeight: "bold",
        padding: "0",
      }}
    >
      {buttonText}
    </button>
  );
};

export default HeaderButton;
