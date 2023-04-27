import React from "react";
import styles from "./Menu.module.scss";
import InitiativeForm from "../forms/InitiativeForm";

export const InitiativeMenu = () => {
  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <InitiativeForm />
      </div>
    </div>
  );
};
