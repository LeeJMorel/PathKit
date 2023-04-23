import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuButton from "./MenuButton";
import MenuInput from "./MenuInput";
import AddEntityForm, { EntityType, IEntity } from "../forms/AddEntityForm";
import { AppMode } from "../../App";

interface IPlannerMenuProps {
  onClose: () => void;
  onSave: (entities: IEntity[], appMode: AppMode) => void;
  planId?: string;
  appModeUsed: AppMode;
}

const PlannerMenu: React.FC<IPlannerMenuProps> = ({
  onClose,
  onSave,
  planId,
  appModeUsed,
}: IPlannerMenuProps) => {
  const [entities, setEntities] = useState<IEntity[]>([]);

  const [showAddEntity, setShowAddEntity] = useState(false);
  const [selectedEntityType, setSelectedEntityType] = useState<EntityType>(
    EntityType.Shop
  );

  const handleClose = () => {
    onClose();
  };

  const handleEntityTypeChange = (selectedEntityType: EntityType) => {
    setSelectedEntityType(selectedEntityType);
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
    onSave(entities, appModeUsed);
    handleClose();
  };
  const renderEncounterPlan = () => {
    return (
      <>
        <div className={styles.entityTypeSelection}>
          <MenuInput
            label="Monster"
            type={"radio"}
            name="entityType"
            onChange={() => handleEntityTypeChange(EntityType.Monster)}
          />
        </div>
        {/* Render the add entity form based on the selected entity type */}
        <AddEntityForm
          type={selectedEntityType}
          onAddEntity={(entity) => handleAddEntity(entity)}
        ></AddEntityForm>
      </>
    );
  };

  const renderExplorationPlan = () => {
    return (
      <>
        <div className={styles.entityTypeSelection}>
          <MenuInput
            label="Shop"
            type={"radio"}
            name="entityType"
            onChange={() => handleEntityTypeChange(EntityType.Shop)}
          />
          <MenuInput
            label="NPC"
            type={"radio"}
            name="entityType"
            onChange={() => handleEntityTypeChange(EntityType.NPC)}
          />
        </div>
        {/* Render the add entity form based on the selected entity type */}
        <AddEntityForm
          type={selectedEntityType}
          onAddEntity={(entity) => handleAddEntity(entity)}
        ></AddEntityForm>
      </>
    );
  };

  const renderAddEntity = () => {
    if (showAddEntity) {
      return appModeUsed === AppMode.encounter
        ? renderEncounterPlan()
        : renderExplorationPlan();
    }
    return null;
  };

  const renderTitle = () => {
    return appModeUsed === AppMode.encounter
      ? "Create Encounter Plan"
      : "Create Exploration Plan";
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <h2>{renderTitle()}</h2>
        <div className={styles.close} onClick={handleClose}>
          <FontAwesomeIcon icon="close" />
        </div>
        <div className={styles.entityList}>
          {entities.map((entity) => (
            <div key={entity.id} className={styles.entity}>
              <div className={styles.entityTitle}>
                <div>{entity.name}</div>
                <div
                  onClick={() =>
                    setEntities(entities.filter((e) => e.id !== entity.id))
                  }
                >
                  &times;
                </div>
              </div>
            </div>
          ))}
          <div className={styles.entityButtonContainer}>
            {!showAddEntity && (
              <MenuButton
                label="Add Entity"
                onClick={handleAddEntityClick}
              ></MenuButton>
            )}
            {renderAddEntity()}
          </div>
        </div>
        <div className={styles.menuButtonContainer}>
          <MenuButton label="Save Plan" onClick={handleSaveClick}></MenuButton>
        </div>
      </div>
    </div>
  );
};

export default PlannerMenu;
