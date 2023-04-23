import classNames from "classnames";
import styles from "./Card.module.scss";
import { IPlan, PlanType } from "../../api/model";

export interface PlannerObjectProps {
  // title: string; //The name given to the planned encounter or exploration
  // images: string[]; //an image for each object added
  // names: string[]; //a name for each object added (we can use this to search for card data, i.e. Cow)
  // isEncounter: boolean; //indicate combat
  plan: IPlan;
}

function PlannerObject({ plan }: PlannerObjectProps) {
  const { entities, planType } = plan;
  return (
    <div className={styles.plannerObject}>
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
