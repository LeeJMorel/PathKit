import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuButton from "./MenuButton";
import AddEntityForm from "../forms/AddEntityForm";
import { EntityType, IEntity } from "../../api/model";
import { useEntities } from "../../hooks";

interface IAddPlayerMenuProps {
  onClose: () => void;
}

const AddPlayerMenu: React.FC<IAddPlayerMenuProps> = ({
  onClose,
}: IAddPlayerMenuProps) => {
  const { addEntity } = useEntities();
  const [newEntity, setNewEntity] = useState<Partial<IEntity>>({});

  const handleClose = () => {
    onClose();
  };

  const handleAddEntity = (entity: Partial<IEntity>) => {
    // setNewEntity((prev) => ({
    //   ...prev,
    //   ...entity,
    // }));
    addEntity(entity as IEntity);
    handleClose();
  };

  // const handleSaveClick = () => {
  //   addEntity(newEntity as IEntity);
  //   handleClose();
  // };

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
            onAddEntity={handleAddEntity}
          ></AddEntityForm>
        </div>
        {/* <div className={styles.menuButtons}>
          <MenuButton
            label="Save Player"
            onClick={handleSaveClick}
          ></MenuButton>
        </div> */}
      </div>
    </div>
  );
};

export default AddPlayerMenu;
