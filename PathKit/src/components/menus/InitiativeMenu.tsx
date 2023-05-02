import React from "react";
import styles from "./Menu.module.scss";
import InitiativeForm from "../forms/InitiativeForm";

export interface InitiativeMenuProps {
  onClose: () => void;
}

export const InitiativeMenu = ({ onClose }: InitiativeMenuProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <InitiativeForm onClose={handleClose} />
      </div>
    </div>
  );
};
