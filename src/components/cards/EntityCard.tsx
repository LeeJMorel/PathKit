import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { IEntity } from "../../api/model";
import { usePreferencesStore } from "../../hooks";
import StatObject from "../objects/StatObject";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import ConditionsDropdown from "../dropdowns/ConditionsDropdown";

interface EntityCardProps extends React.HTMLProps<HTMLDivElement> {
  entity: IEntity;
}

const exampleStats = {
  ac: 18,
  will: 13,
  reflex: 10,
  fortitude: 12,
  dc: 12,
};

function EntityCard({ entity, className, ...rest }: EntityCardProps) {
  const [showConditionsMenu, setShowConditionsMenu] = useState(false);
  const { preferences, setPreferences } = usePreferencesStore();
  const navigate = useNavigate();

  const handleConditionsClick = () => {
    setShowConditionsMenu((prevValue) => !prevValue);
  };

  const handleEntityClick = (id: number) => {
    const selectedSearch = null;
    setPreferences({
      selectedSearch,
    });
    navigate(`/entity/${entity.id}`);
  };
  const isHPZero = entity.hp && entity.hp[0] === 0;
  const stats = entity.stats || {};

  const statKeys = Object.keys(exampleStats);

  return (
    <div className={classNames(styles.card, className)} {...rest}>
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
                {showConditionsMenu && (
                  <ConditionsDropdown
                    onConditionSelect={(condition) => {
                      console.log(condition);
                      handleConditionsClick(); // call handleConditionsClick to hide the menu
                    }}
                  />
                )}
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
