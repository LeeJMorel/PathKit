import React from "react";
import styles from "./Menu.module.scss";
import MenuButton from "./MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IDeleteMenuProps {
  type: "entity" | "plan" | "campaign";
  id: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const DeleteMenu: React.FC<IDeleteMenuProps> = ({
  type,
  id,
  onClose,
  onConfirm,
}: IDeleteMenuProps) => {
  const handleYesClick = () => {
    onConfirm?.();
    //Do something with the stores
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.deleteMenu}>
          <h2>Delete</h2>
          <p>
            Are you sure you wish to permanently remove this? Once you press
            yes, this cannot be undone.
          </p>
          <div className={styles.menuRowContainer}>
            <MenuButton label="No" onClick={handleClose}></MenuButton>
            <MenuButton label="Yes" onClick={handleYesClick}></MenuButton>
          </div>
        </div>
        <div className={styles.close} onClick={handleClose}>
          <FontAwesomeIcon icon="close" />
        </div>
      </div>
    </div>
  );
};

export default DeleteMenu;
