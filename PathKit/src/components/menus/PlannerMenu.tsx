import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuButton from "./MenuButton";
import MenuInput from "./MenuInput";
import AddEntityForm from "../forms/AddEntityForm";
import { AppMode } from "../../App";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";
import { usePlans } from "../../hooks";

interface IPlannerMenuProps {
  onClose: () => void;
  planId?: string;
  planType: PlanType;
}

const PlannerMenu: React.FC<IPlannerMenuProps> = ({
  onClose,
  planId,
  planType,
}: IPlannerMenuProps) => {
  const { addPlan, getPlanById } = usePlans();
  const [plan, setPlan] = useState<Omit<IPlan, "id" | "campaignId">>(
    getPlanById(planId) || {
      planType,
      entities: [],
    }
  );

  const [showAddEntity, setShowAddEntity] = useState(false);
  const [showType, setType] = useState(false);
  const [selectedEntityType, setSelectedEntityType] = useState<EntityType>(
    EntityType.Shop
  );

  const handleClose = () => {
    onClose();
  };

  const handleEntityTypeChange = (selectedEntityType: EntityType) => {
    setSelectedEntityType(selectedEntityType);
    setType(true);
  };

  const handleAddEntityClick = () => {
    setShowAddEntity(true);
  };

  const handleAddEntity = (entity: IEntity) => {
    setPlan({
      ...plan,
      entities: [...plan.entities, entity],
    });
    setShowAddEntity(false);
  };

  const handleDeleteEntity = (entityId: string) => {
    setPlan({
      ...plan,
      entities: plan.entities.filter((entity) => entity.id !== entityId),
    });
  };

  const handleAddEntityCancel = () => {
    setShowAddEntity(false);
  };

  const handleSaveClick = () => {
    addPlan(plan);
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
        {showType && (
          <AddEntityForm
            type={selectedEntityType}
            onAddEntity={(entity) => handleAddEntity(entity)}
          />
        )}
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
        {showType && (
          <AddEntityForm
            type={selectedEntityType}
            onAddEntity={(entity) => handleAddEntity(entity)}
          />
        )}
      </>
    );
  };

  const renderAddEntity = () => {
    if (showAddEntity) {
      return planType === PlanType.encounter
        ? renderEncounterPlan()
        : renderExplorationPlan();
    }
    return null;
  };

  const renderTitle = () => {
    return planType === PlanType.encounter
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
          {plan.entities.map((entity) => (
            <div key={entity.id} className={styles.entity}>
              <div className={styles.entityTitle}>
                <button
                  className={styles.iconButton}
                  onClick={() => handleDeleteEntity(entity.id)}
                >
                  <FontAwesomeIcon icon="trash" />
                </button>
                <div>{entity.name}</div>
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
