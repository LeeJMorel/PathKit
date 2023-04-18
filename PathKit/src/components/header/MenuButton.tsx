import React, { useState } from "react";
import MainMenu from "../menus/MainMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MenuButtonProps {
  // Add any other props as needed
}

const MenuButton: React.FC<MenuButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger menu icon */}
      <FontAwesomeIcon
        icon="bars"
        style={{ color: "#000" }}
        onClick={handleToggleMenu}
      />

      {/* Render MainMenu component */}
      {isOpen && <MainMenu />}
    </div>
  );
};

export default MenuButton;
