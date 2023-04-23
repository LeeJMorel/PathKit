import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuButton from "./MenuButton";
import AddEntityForm, { EntityType, IEntity } from "../forms/AddEntityForm";

interface IAddPlayerMenuProps {
  onClose: () => void;
  onSave: (entities: IEntity[]) => void;
}

const AddPlayerMenu: React.FC<IAddPlayerMenuProps> = ({
  onClose,
  onSave,
}: IAddPlayerMenuProps) => {
  const [entities, setEntities] = useState<IEntity[]>([]);

  const [showAddEntity, setShowAddEntity] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleAddEntityClick = () => {
    setShowAddEntity(true);
  };

  const handleAddEntity = (entity: IEntity) => {
    const newEntity: IEntity = {
      ...entity,
    };
    setEntities([...entities, newEntity]);
    setShowAddEntity(false);
  };

  const handleAddEntityCancel = () => {
    setShowAddEntity(false);
  };

  const handleSaveClick = () => {
    onSave(entities);
    handleClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <h2>Add a new Player</h2>
        <div className={styles.close} onClick={handleClose}>
          <FontAwesomeIcon icon="close" />
        </div>
        <div className={styles.entityList}>
          <AddEntityForm
            type={EntityType.Player}
            onAddEntity={(entity) => handleAddEntity(entity)}
          ></AddEntityForm>
        </div>
        <div className={styles.menuButtons}>
          <MenuButton
            label="Save Player"
            onClick={handleSaveClick}
          ></MenuButton>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerMenu;
