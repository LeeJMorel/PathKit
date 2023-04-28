import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuButton from "../buttons/Button";
import AddEntityForm from "../forms/AddEntityForm";
import { EntityType, IEntity } from "../../api/model";
import { useEntities, usePreferencesStore } from "../../hooks";

interface IAddPlayerMenuProps {
  onClose: () => void;
}

const AddPlayerMenu: React.FC<IAddPlayerMenuProps> = ({
  onClose,
}: IAddPlayerMenuProps) => {
  const { addEntity } = useEntities();
  const [newEntity, setNewEntity] = useState<Partial<IEntity>>({});
  const { preferences, setPreferences } = usePreferencesStore();

  const handleClose = () => {
    onClose();
  };

  const handleAddEntity = (entity: Partial<IEntity>) => {
    addEntity(entity as IEntity);
    if (entity.id) {
      // Check if entity.id exists
      setPreferences({
        ...preferences,
        activePlayers: [...preferences.activePlayers, entity.id],
      });
    }
    handleClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.header}>
          <h2 title={"Add a new Player"}>Add a new Player</h2>
          <div
            className={styles.close}
            title={"Close Add Player Form"}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon="close" />
          </div>
        </div>
        <div className={styles.entityList}>
          <AddEntityForm
            type={EntityType.Player}
            onAddEntity={handleAddEntity}
          ></AddEntityForm>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerMenu;
