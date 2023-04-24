import classNames from "classnames";
import styles from "./Card.module.scss";
import { IPlan, PlanType } from "../../api/model";
import { usePreferencesStore } from "../../hooks";

export interface PlannerObjectProps {
  plan: IPlan;
}

function PlannerObject({ plan }: PlannerObjectProps) {
  const { entities, planType } = plan;
  const { setPreferences } = usePreferencesStore();

  const handleClick = () => {
    setPreferences({ selectedPlan: plan.id });
  };

  return (
    <div className={styles.plannerObject} onClick={handleClick}>
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
        <div className={styles.exclamation}>!</div>
      )}
    </div>
  );
}

export default PlannerObject;
