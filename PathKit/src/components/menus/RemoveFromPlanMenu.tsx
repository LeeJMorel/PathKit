import styles from "./Menu.module.scss";
import MenuButton from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlans, useEntities, useCampaigns } from "../../hooks";
import { WelcomeMenu } from "./WelcomeMenu";
import { useState } from "react";

interface IRemoveMenuProps {
  id: string;
  onClose: () => void;
}

const RemoveMenu: React.FC<IRemoveMenuProps> = ({
  id,
  onClose,
}: IRemoveMenuProps) => {
  const plans = usePlans();
  const { deleteEntity } = useEntities();

  const handleYesClick = () => {
    deleteEntity(id);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.deleteMenu}>
          <div className={styles.header}>
            <h2>Remove From Plan</h2>
            <div className={styles.close} onClick={handleClose}>
              <FontAwesomeIcon icon="close" />
            </div>
          </div>
          <p>
            Are you sure you wish to permanently remove this from your plan? The
            NPC, Monster, or Shop will still exist so you can load them back on
            by editing the plan.
          </p>
          <div className={styles.menuRowContainer}>
            <MenuButton onClick={handleClose}>No</MenuButton>
            <MenuButton onClick={handleYesClick}>Yes</MenuButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMenu;
