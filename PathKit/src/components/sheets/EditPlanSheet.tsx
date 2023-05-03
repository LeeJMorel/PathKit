import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import uniq from "lodash.uniq";
import AddEntityForm from "../forms/AddEntityForm";
import { PartialPlan, usePlans, useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button, ToggleButton } from "../buttons";
import { EntityType, PlanType, IEntity } from "../../api/model";
import BinderObject from "../objects/BinderObject";
import classNames from "classnames";

const defaultPlanData = {
  planType: PlanType.encounter,
  entities: [],
};
function EditPlanSheet() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { getPlanById, updateOrAddPlan } = usePlans();
  const { getEntitiesById } = useEntities();

  const [plan, setPlan] = useState<PartialPlan>(
    getPlanById(planId) || defaultPlanData
  );

  useEffect(() => {
    const p = getPlanById(planId);
    // Create plan and redirect to this form with the right ID
    if (planId === "new") {
      const newPlan = updateOrAddPlan(defaultPlanData);
      navigate(`/plan/${newPlan.id}`, {
        replace: true,
      });
    } else if (p) {
      setPlan(p);
    }
  }, [planId]);

  const planEntities = getEntitiesById(plan.entities);

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleSavePlan = () => {
    updateOrAddPlan(plan);
    navigate("/");
  };

  const [planType, setPlanType] = useState(PlanType.encounter);
  const handlePlanTypeChange = (value: PlanType) => {
    setPlanType(value);
  };

  //We want to show the load menu
  const [showLoad, setShowLoad] = useState(false);
  const handleLoadClick = () => {
    navigate(`/plan/${plan.id}/load`);
  };

  // We want to add or edit an entity
  const handleAddEntity = useCallback(
    (selectedEntityType: EntityType) => {
      console.log({ plan, planId, what: getPlanById(planId) });
      navigate(`/plan/${plan.id}/entity/new?type=${selectedEntityType}`);
    },
    [plan]
  );
  const handleEditEntity = useCallback(
    (entityId: string) => {
      navigate(`/plan/${plan.id}/entity/${entityId}`);
    },
    [plan]
  );

  //we want to remove an entity from our plan
  const handleRemoveEntity = (id: string) => {
    setPlan((prev) => ({
      ...prev,
      entities: uniq(prev.entities.filter((i) => i !== id)),
    }));
  };

  let headerText = `Plan: ${planEntities
    .map((entity) => entity.name)
    .join(", ")}`;

  const handleLoadEntity = (entity: IEntity) => {
    setPlan((prev) => ({
      ...prev,
      entities: uniq([...prev.entities, entity.id]),
    }));
    navigate(-1);
  };

  const renderAddEntityRow = () => (
    <div className={styles.sheetRowContainer}>
      <Button onClick={() => handleAddEntity(EntityType.Shop)}>Add Shop</Button>
      <Button onClick={() => handleAddEntity(EntityType.NPC)}>Add NPC</Button>
      <Button onClick={() => handleAddEntity(EntityType.Monster)}>
        Add Monster
      </Button>
      <Button onClick={() => handleLoadClick()}>Load</Button>
    </div>
  );

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <h2>{headerText}</h2>
        <Button
          onClick={handleCancelClick}
          title="Cancel"
          icon="close"
          variant="text"
        />
      </div>
      <hr />
      <div className={styles.entityList}>
        {planEntities.map((entity) => (
          <div key={entity.id} className={styles.sheetRowContainer}>
            <div className={styles.sheetEndContainer}>
              <Button
                variant="text"
                onClick={() => handleEditEntity(entity.id)}
                icon="pencil"
                title={`Edit ${entity.entityType || "entity"}`}
              />

              <div className={styles.menuTitle}>{entity.name}</div>
            </div>
            {entity.id && (
              <Button
                variant="text"
                className={styles.deleteButton}
                onClick={() => handleRemoveEntity(entity.id)}
                icon="user-minus"
                title="Remove from plan"
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.sheetCenterContainer}>
        <ToggleButton
          options={[PlanType.encounter, PlanType.exploration]}
          value={planType}
          onChange={handlePlanTypeChange}
        />
      </div>
      <div className={styles.sheetRowContainer}>
        <Routes>
          <Route index element={renderAddEntityRow()} />
          <Route
            path="entity/:entityId"
            element={
              <div className={styles.editEntityContainer}>
                <h3>Edit entity</h3>
                <AddEntityForm
                  onAddEntity={(entity) => {
                    setPlan((prev) => ({
                      ...prev,
                      entities: uniq([...prev.entities, entity.id]),
                    }));
                    navigate(-1);
                  }}
                />
              </div>
            }
          />
          <Route
            path="load"
            element={
              <div className={styles.binderContainer}>
                <BinderObject
                  onLoad={handleLoadEntity}
                  filterEntities={plan.entities}
                />
              </div>
            }
          />
        </Routes>
      </div>

      <div className={classNames(styles.sheetRowContainer, styles.end)}>
        <Button onClick={handleSavePlan} variant="primary">
          Save Plan
        </Button>
      </div>
    </div>
  );
}

export default EditPlanSheet;
