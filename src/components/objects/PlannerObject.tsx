import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Objects.module.scss";
import { IPlan, PlanType } from "../../api/model";
import { usePreferencesStore, useEntities } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface PlannerObjectProps {
  plan: IPlan;
}

function PlannerObject({ plan }: PlannerObjectProps) {
  const { planEntities: entities, planType } = plan;
  const { getEntitiesById } = useEntities();
  const planEntities = getEntitiesById(entities);
  const { setPreferences } = usePreferencesStore();
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    setPreferences({ selectedPlan: plan.planId });
  };
  const tooltipId = `tooltip-${plan.planId}`;

  return (
    <div
      className={styles.plan}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-tooltip-id={tooltipId}
    >
      {planEntities.map((entity, i) => {
        if (i < 4) {
          return (
            <img
              key={entity.entityId}
              src={entity.entityImage}
              alt={entity.entityName}
              className={classNames(planEntities.length > 1 && styles.grid)}
            />
          );
        }
      })}
      {planEntities.length > 4 && <div className={styles.fourPlus}>+</div>}
      {planType === PlanType.encounter && (
        <>
          <div className={styles.overlay}></div>
          <FontAwesomeIcon className={styles.sword} icon="dragon" />
        </>
      )}
      {isHovering && (
        <div className={styles.tooltip}>
          {planEntities.map((e) => e.entityName).join(",\n")}
        </div>
      )}
    </div>
  );
}

export default PlannerObject;
