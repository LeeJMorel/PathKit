import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { IEntity } from "../../api/model";
import { usePreferencesStore } from "../../hooks";
import { useState } from "react";
import StatObject from "../objects/StatObject";
import { IconName } from "@fortawesome/fontawesome-svg-core";

interface EntityCardProps {
  entity: IEntity;
}

const exampleStats = {
  ac: 18,
  will: 13,
  reflex: 10,
  fortitude: 12,
  dc: 12,
};

function EntityCard({ entity }: EntityCardProps) {
  const [showConditionsMenu, setShowConditionsMenu] = useState(false);
  const { preferences, setPreferences } = usePreferencesStore();

  const handleConditionsClick = () => {
    setShowConditionsMenu(true);
  };

  const handleEntityClick = (id: string) => {
    const selectedSearch = null;
    setPreferences({
      ...preferences,
      selectedEntity: id,
      selectedSearch,
    });
  };
  const isHPZero = entity.hp && entity.hp[0] === 0;
  const stats = entity.stats || {};

  const statKeys = Object.keys(exampleStats);

  return (
    <div className={styles.card}>
      <div
        key={entity.id}
        className={styles.cardContainer}
        onClick={() => handleEntityClick(entity.id)}
      >
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
                <button
                  className={styles.entityHPButton}
                  onClick={handleConditionsClick}
                >
                  <FontAwesomeIcon icon="plus" />
                </button>
                <div className={styles.entityHPNumbers}>
                  {entity.hp[0]}/{entity.hp[1]}
                </div>
              </div>
              <div className={styles.entityStats}>
                {Object.entries(exampleStats).map(([statKey, stat]) => {
                  let icon: IconName;
                  switch (statKey) {
                    case "ac":
                      icon = "shield";
                      break;
                    case "dc":
                      icon = "star";
                      break;
                    default:
                      icon = "circle";
                  }
                  let label;
                  switch (statKey) {
                    case "will":
                      label = "w";
                      break;
                    case "reflex":
                      label = "r";
                      break;
                    case "fortitude":
                      label = "f";
                      break;
                    default:
                      break;
                  }
                  return (
                    <div
                      key={statKey}
                      className={styles.entityStat}
                      title={`${statKey}: ${stat}`}
                    >
                      <StatObject icon={icon} number={stat} label={label} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {showConditionsMenu && (
        <div className={styles.conditionsMenu}>
          {/* {conditions.map((condition) => (
            <div
              key={condition.id}
              className={styles.conditionsMenuItem}
              onMouseOver={() => {
                console.log(`Apply condition ${condition.name}`);
              }}
            >
              {condition.name}
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
}

export default EntityCard;
