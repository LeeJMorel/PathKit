import React from "react";
import styles from "./Menu.module.scss";
import MenuButton from "./MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlans, useEntities, useCampaigns } from "../../hooks";

interface IDeleteMenuProps {
  type: "entity" | "plan" | "campaign";
  id: string;
  onClose: () => void;
}

const DeleteMenu: React.FC<IDeleteMenuProps> = ({
  type,
  id,
  onClose,
}: IDeleteMenuProps) => {
  const plans = usePlans();
  const { deleteEntity } = useEntities();
  const { deleteCampaign } = useCampaigns();

  const handleYesClick = () => {
    switch (type) {
      case "plan":
        deletePlan(id);
        break;
      case "entity":
        deleteEntity(id);
        break;
      case "campaign":
        deleteCampaign(id);
        break;

      default:
        break;
    }

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const deletePlan = (id: string) => {
    plans.deletePlan(id);
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
