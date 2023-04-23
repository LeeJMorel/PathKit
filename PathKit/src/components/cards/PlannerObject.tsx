import classNames from "classnames";
import styles from "./Card.module.scss";

export interface PlannerObjectProps {
  title: string; //The name given to the planned encounter or exploration
  images: string[]; //an image for each object added
  names: string[]; //a name for each object added (we can use this to search for card data, i.e. Cow)
  isEncounter: boolean; //indicate combat
}

function PlannerObject({ images, names, isEncounter }: PlannerObjectProps) {
  return (
    <div className={styles.plannerObject}>
      {images.map((image, i) => {
        if (i < 4) {
          return (
            <img
              key={names[i]}
              src={image}
              alt={names[i]}
              className={classNames(images.length > 1 && styles.grid)}
            />
          );
        }
      })}
      {images.length > 4 && <div className={styles.fourPlus}>+</div>}
      {isEncounter == true && <div className={styles.exclamation}>!</div>}
    </div>
  );
}

export default PlannerObject;
