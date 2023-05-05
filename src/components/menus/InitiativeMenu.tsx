import React from "react";
import styles from "./Menu.module.scss";
import InitiativeForm from "../forms/InitiativeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEntities, usePreferencesStore } from "../../hooks";

export interface InitiativeMenuProps {
  onClose: () => void;
}

export const InitiativeMenu = ({ onClose }: InitiativeMenuProps) => {
  const handleClose = () => {
    onClose();
  };

  const { preferences, setPreferences } = usePreferencesStore();
  const { resetEntities } = useEntities();
  const cancelPlan = () => {
    const selectedPlan = null;
    setPreferences({
      ...preferences,
      selectedPlan,
    });
    resetEntities();
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.header}>
          <h2>Roll For Initiative</h2>
          <div className={styles.close} onClick={cancelPlan}>
            <FontAwesomeIcon icon="close" />
          </div>
        </div>
        <hr />
        <InitiativeForm onClose={handleClose} />
      </div>
    </div>
  );
};
