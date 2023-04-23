import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { IEntity } from "../../api/model";

interface EntityCardProps {
  entities: IEntity[];
}

function EntityCard({ entities }: EntityCardProps) {
  return (
    <div className={styles.card}>
      {entities.map((entity) => {
        const isHPZero = entity.hp && entity.hp[0] === 0;
        const stats = entity.stats || {};

        const statKeys = Object.keys(stats);
        return (
          <div key={entity.id} className={styles.cardContainer}>
            <div
              className={classNames(
                styles.cardImage,
                isHPZero && styles.entityDeadImage
              )}
            >
              <img src={entity.image} alt={entity.name} />
              {isHPZero && (
                <FontAwesomeIcon className={styles.deadIcon} icon="skull" />
              )}
            </div>
            <div className={styles.entityContent}>
              <div className={styles.entityName}>{entity.name}</div>
              {entity.hp && (
                <>
                  <div className={styles.entityHP}>
                    <button className={styles.entityHPButton}>
                      <FontAwesomeIcon icon="plus" />
                    </button>
                    <div className={styles.entityHPNumbers}>
                      {entity.hp[0]}/{entity.hp[1]}
                    </div>
                  </div>
                  <div className={styles.entityStats}>
                    {statKeys.map((statKey) => (
                      <div key={statKey} className={styles.entityStat}>
                        <div className={styles.statCircle}>
                          {stats[statKey]}
                        </div>
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
