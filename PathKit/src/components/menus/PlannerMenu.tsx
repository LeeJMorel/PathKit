import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import MenuInput from "./MenuInput";
import AddEntityForm from "../forms/AddEntityForm";
import { AppMode } from "../../App";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";
import { usePlans } from "../../hooks";
import { render } from "@testing-library/react";

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

  const handleAddEntityClick = (selectedEntityType: EntityType) => {
    setShowAddEntity(true);
    setSelectedEntityType(selectedEntityType);
    setType(true);
  };

  const handleAddEntity = (entity: IEntity) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      entities: [...prevPlan.entities, entity],
    }));
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

  const renderAddEntity = () => {
    if (showAddEntity) {
      return (
        <AddEntityForm
          type={selectedEntityType}
          onAddEntity={(entity) => handleAddEntity(entity)}
        />
      );
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
          <div className={styles.menuColumnContainer}>
            {!showAddEntity && (
              <div className={styles.addButtons}>
                <Button onClick={() => handleAddEntityClick(EntityType.Shop)}>
                  Add Shop
                </Button>
                <Button onClick={() => handleAddEntityClick(EntityType.NPC)}>
                  Add NPC
                </Button>
                <Button
                  onClick={() => handleAddEntityClick(EntityType.Monster)}
                >
                  Add Monster
                </Button>
              </div>
            )}
            {renderAddEntity()}
          </div>
        </div>
        <div className={styles.menuColumnContainer}>
          <Button onClick={handleSaveClick}>Save Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default PlannerMenu;
