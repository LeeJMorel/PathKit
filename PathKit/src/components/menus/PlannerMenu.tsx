import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import AddEntityForm from "../forms/AddEntityForm";
import { EntityType, IEntity, IPlan, PlanType } from "../../api/model";
import {
  PartialPlan,
  usePlans,
  useEntities,
  usePreferencesStore,
} from "../../hooks";
import RemoveFromPlanMenu from "./RemoveFromPlanMenu";
import BinderObject from "../objects/BinderObject";
import { RoundButton } from "../buttons";

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

  const [showRemoveMenu, setShowRemoveMenu] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<string>("");

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

  const handleRemove = (id: string) => {
    setShowRemoveMenu(true);
    setRemoveId(id);
  };

  const handleRemoveEntity = () => {
    const newPlan = {
      ...plan,
      entities: plan.entities.filter((entity) => entity.id !== removeId),
    };
    setPlan(newPlan);
    updateOrAddPlan(newPlan);
  };

  //We want to show the load menu
  const [showLoad, setShowLoad] = useState(false);
  const handleLoadClick = () => {
    setShowLoad(true);
  };

  const [showEntityForm, setShowEntityForm] = useState<IEntity | null>(null);
  const handleEditEntity = (entity: IEntity) => {
    setShowEntityForm(entity);
  };
  const handleEditClose = () => {
    setShowEntityForm(null);
  };

  const renderEntityForm = () => {
    if (showEntityForm && showEntityForm.entityType) {
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

  const handleDeleteClose = () => {
    setShowRemoveMenu(false);
  };

  const handleSaveClick = () => {
    // addPlan(plan);
    updateOrAddPlan(plan);
    handleClose();
  };

  //if an entity is selected, set that to load it
  const { preferences, setPreferences } = usePreferencesStore();
  const { getEntityById } = useEntities();
  const [entity, setEntity] = useState<IEntity>();

  useEffect(() => {
    if (preferences.selectedEntity) {
      const entity = getEntityById(preferences.selectedEntity);
      setEntity(entity);
    } else {
      setEntity(undefined);
    }
  }, [preferences.selectedEntity, getEntityById]);

  const handleLoadMenuClick = () => {
    //loadCampaign(selectedCampaign);
    setPreferences({ selectedEntity: null });
  };

  const handleCloseBinder = () => {
    //loadCampaign(selectedCampaign);
    setPreferences({ selectedEntity: null });
    setShowLoad(false);
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
        ) : showLoad ? (
          <>
            <BinderObject load={true} />
            <div className={styles.menuRowContainer}>
              <Button
                disabled={!preferences.selectedEntity}
                onClick={handleLoadMenuClick}
              >
                Load
              </Button>
              <Button onClick={handleCloseBinder}>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            {showRemoveMenu && planId && (
              <RemoveFromPlanMenu
                planId={planId}
                entityId={removeId}
                onClose={handleDeleteClose}
                onRemove={handleRemoveEntity}
              />
            )}
            <div className={styles.header}>
              <h2>{renderTitle()}</h2>
              <div className={styles.close} onClick={handleClose}>
                <FontAwesomeIcon icon="close" />
              </div>
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
                  {entity.id && (
                    <Button
                      subtle
                      className={styles.deleteButton}
                      onClick={() => handleRemove(entity.id)}
                    >
                      <FontAwesomeIcon icon="user-minus" />
                    </Button>
                  )}
                </div>
              ))}
              <div className={styles.menuColumnContainer}>
                {!showAddEntity && (
                  <div className={styles.menuRowContainer}>
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
                    <Button onClick={() => handleLoadClick()}>Load</Button>
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
