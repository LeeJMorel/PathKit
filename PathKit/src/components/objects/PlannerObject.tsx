import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Objects.module.scss";
import { IPlan, PlanType } from "../../api/model";
import { usePreferencesStore } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface PlannerObjectProps {
  plan: IPlan;
}

function PlannerObject({ plan }: PlannerObjectProps) {
  const { entities, planType } = plan;
  const { setPreferences } = usePreferencesStore();
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    setPreferences({ selectedPlan: plan.id });
  };
  const tooltipId = `tooltip-${plan.id}`;

  return (
    <div
      className={styles.plan}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-tooltip-id={tooltipId}
    >
      {entities.map((entity, i) => {
        if (i < 4) {
          return (
            <img
              key={entity.id}
              src={entity.image}
              alt={entity.name}
              className={classNames(entities.length > 1 && styles.grid)}
            />
          );
        }
      })}
      {entities.length > 4 && <div className={styles.fourPlus}>+</div>}
      {planType === PlanType.encounter && (
        <>
          <div className={styles.overlay}></div>
          <FontAwesomeIcon className={styles.sword} icon="dragon" />
        </>
      )}
      {isHovering && (
        <div className={styles.tooltip}>
          {entities.map((e) => e.name).join(",\n")}
        </div>
      )}
    </div>
  );
}

export default PlannerObject;
