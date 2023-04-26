import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import MenuInput from "./MenuInput";
import AddEntityForm from "../forms/AddEntityForm";
import { AppMode } from "../../App";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";
import { PartialPlan, usePlans, useEntities } from "../../hooks";
import DeleteMenu from "./DeleteMenu";

interface IPlannerMenuProps {
  onClose: () => void;
  planId?: string;
  planType?: PlanType;
}

const PlannerMenu: React.FC<IPlannerMenuProps> = ({
  onClose,
  planId,
  planType = PlanType.encounter,
}: IPlannerMenuProps) => {
  const { addPlan, getPlanById, updateOrAddPlan } = usePlans();
  const { updateEntity } = useEntities();
  const [plan, setPlan] = useState<PartialPlan>(
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

  const [showEntityForm, setShowEntityForm] = useState<IEntity | null>(null);
  const handleEditEntity = (entity: IEntity) => {
    setShowEntityForm(entity);
  };
  const handleEditClose = () => {
    setShowEntityForm(null);
  };
  const renderEntityForm = () => {
    if (showEntityForm) {
      return (
        <div className={styles.tabContent}>
          <h2>Edit {showEntityForm.entityType}</h2>
          <div className={styles.close} onClick={handleEditClose}>
            <FontAwesomeIcon icon="close" />
          </div>
          <AddEntityForm
            entityData={showEntityForm}
            type={showEntityForm.entityType}
            onAddEntity={(entity) => {
              updateEntity(entity);
              setShowEntityForm(null);
            }}
          />
        </div>
      );
    }
  };

  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"entity" | "plan" | "campaign">(
    "entity"
  );
  const [deleteId, setDeleteId] = useState<string>("");
  const handleDelete = (type: "entity" | "plan" | "campaign", id: string) => {
    setShowDeleteMenu(true);
    setDeleteType(type);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setShowDeleteMenu(false);
  };

  const handleSaveClick = () => {
    // addPlan(plan);
    updateOrAddPlan(plan);
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
      ? "Encounter Plan"
      : "Exploration Plan";
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        {showEntityForm ? (
          renderEntityForm()
        ) : (
          <>
            {showDeleteMenu && (
              <DeleteMenu
                type={deleteType}
                id={deleteId}
                onClose={handleDeleteClose}
              />
            )}
            <h2>{renderTitle()}</h2>
            <div className={styles.close} onClick={handleClose}>
              <FontAwesomeIcon icon="close" />
            </div>
            <div className={styles.entityList}>
              {plan.entities.map((entity) => (
                <div key={entity.id} className={styles.menuRowContainer}>
                  <div className={styles.menuEndContainer}>
                    <Button onClick={() => handleEditEntity(entity)}>
                      <FontAwesomeIcon icon="pencil" />
                    </Button>

                    <div className={styles.menuTitle}>{entity.name}</div>
                  </div>
                  <div
                    className={styles.deleteButton}
                    onClick={() => handleDelete("entity", entity.id)}
                  >
                    <FontAwesomeIcon icon="close" />
                  </div>
                </div>
              ))}
              <div className={styles.menuColumnContainer}>
                {!showAddEntity && (
                  <div className={styles.addButtons}>
                    <Button
                      onClick={() => handleAddEntityClick(EntityType.Shop)}
                    >
                      Add Shop
                    </Button>
                    <Button
                      onClick={() => handleAddEntityClick(EntityType.NPC)}
                    >
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
          </>
        )}
      </div>
    </div>
  );
};

export default PlannerMenu;
