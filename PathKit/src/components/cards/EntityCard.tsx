import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./Card.module.scss";

interface EntityCardProps {
  // entityObjects: EntityObjectProps[];
}

function EntityCard() {
  return (
    <div className={styles.card}>
      {/* {entityObjects.map((entityObject) => {
        const isHPZero = entityObject.hp[0] === 0;
        return (
          <div key={entityObject.name} className={styles.cardContainer}>
            <div
              className={classNames(
                styles.cardImage,
                isHPZero && styles.entityDeadImage
              )}
            >
              <img src={entityObject.image} alt={entityObject.name} />
              {isHPZero && (
                <FontAwesomeIcon className={styles.deadIcon} icon="skull" />
              )}
            </div>
            <div className={styles.entityContent}>
              <div className={styles.entityName}>{entityObject.name}</div>
              {entityObject.isEncounter && (
                <>
                  <div className={styles.entityHP}>
                    <button className={styles.entityHPButton}>
                      <FontAwesomeIcon icon="plus" />
                    </button>
                    <div className={styles.entityHPNumbers}>
                      {entityObject.hp[0]}/{entityObject.hp[1]}
                    </div>
                  </div>
                  <div className={styles.entityStats}>
                    {/* {entityObject.stats.map((stat, index) => (
                      <div key={index} className={styles.entityStat}>
                        <div className={styles.statCircle}>{stat}</div>
                      </div>
                    ))} 
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })} */}
    </div>
  );
}

export default EntityCard;
