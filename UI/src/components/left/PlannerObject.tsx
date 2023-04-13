import classNames from "classnames";
import styles from "./PlannerObject.module.scss";

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
  // Determine the number of images and display accordingly
  // if (images.length === 1) {
  //   return (
  //     <div className={styles.plannerObject}>
  //       <img src={images[0]} alt={names[0]} />
  //       {isEncounter == true && <div className={styles.exclamation}>!</div>}
  //     </div>
  //   );
  // } else if (images.length === 2) {
  //   return (
  //     <div className={styles.plannerObject}>
  //       <div className={styles.additionalObject}></div>
  //       <div className={styles.additionalObject}>
  //         <img src={images[0]} alt={names[0]} />
  //       </div>
  //       <div className={styles.additionalObject}>
  //         <img src={images[1]} alt={names[1]} />
  //         {isEncounter == true && <div className={styles.exclamation}>!</div>}
  //       </div>
  //       <div className={styles.additionalObject}></div>
  //     </div>
  //   );
  // } else if (images.length === 3) {
  //   return (
  //     <div className={styles.plannerObject}>
  //       <div className={styles.row}>
  //         <div className={styles.additionalObject}>
  //           <img src={images[0]} alt={names[0]} />
  //         </div>
  //         <div className={styles.additionalObject}>
  //           <img src={images[1]} alt={names[1]} />
  //           {isEncounter == true && <div className={styles.exclamation}>!</div>}
  //         </div>
  //       </div>
  //       <div className={styles.row}>
  //         <div className={styles.additionalObject}>
  //           <img src={images[2]} alt={names[2]} />
  //         </div>
  //         <div className={styles.additionalObject}></div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className={styles.plannerObject}>
  //       <div className={styles.row}>
  //         <div className={styles.additionalObject}>
  //           <img src={images[0]} alt={names[0]} />
  //         </div>
  //         <div className={styles.additionalObject}>
  //           <img src={images[1]} alt={names[1]} />
  //         </div>
  //       </div>
  //       <div className={styles.row}>
  //         <div className={styles.additionalObject}>
  //           <img src={images[2]} alt={names[2]} />
  //           {isEncounter == true && <div className={styles.exclamation}>!</div>}
  //         </div>
  //         <div className={styles.additionalObject}>
  //           <img src={images[3]} alt={names[3]} />
  //           {images.length > 4 && <div className={styles.fourPlus}>+</div>}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default PlannerObject;
