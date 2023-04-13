import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { EntityObjectProps } from "../../Left";
import styles from "./EntityCard.module.scss";

interface EntityCardProps {
  entityObjects: EntityObjectProps[];
}

function EntityCard({ entityObjects }: EntityCardProps) {
  return (
    <div className={styles.entityCard}>
      {entityObjects.map((entityObject) => {
        const isHPZero = entityObject.hp[0] === 0;
        return (
          <div key={entityObject.name} className={styles.entityContainer}>
            <div
              className={classNames(
                styles.entityImage,
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
                    {entityObject.stats.map((stat, index) => (
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
      })}
    </div>
  );
}

export default EntityCard;
