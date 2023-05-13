import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { IEntity, Proficiency } from "../../api/model";
import { usePreferencesStore, useBoolean } from "../../hooks";
import StatObject from "../objects/StatObject";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import ConditionsDropdown from "../dropdowns/ConditionsDropdown";
import { getProficiencyModifier } from "../../utilities";
import { StatsDisplay } from "../displays/StatsDisplay";

interface EntityCardProps extends React.HTMLProps<HTMLDivElement> {
  entity: IEntity;
}

function EntityCard({ entity, className, ...rest }: EntityCardProps) {
  const { value: showConditionsMenu, toggle: toggleConditionsMenu } =
    useBoolean(false);
  const { preferences, setPreferences } = usePreferencesStore();
  const navigate = useNavigate();

  const handleConditionsClick = () => {
    toggleConditionsMenu();
  };

  const cardStats = {
    ac: entity.build.acTotal.acTotal,
    fortitude: getProficiencyModifier(entity, Proficiency.fortitude),
    will: getProficiencyModifier(entity, Proficiency.will),
    reflex: getProficiencyModifier(entity, Proficiency.reflex),
    dc: getProficiencyModifier(entity, Proficiency.classDC),
  };

  const handleEntityClick = (id: number) => {
    const selectedSearch = null;
    setPreferences({
      selectedSearch,
    });
    navigate(`/entity/${entity.id}`);
  };
  // const isHPZero = entity.hp && entity.hp[0] === 0;
  // const stats = entity.stats || {};

  return (
    <div className={classNames(styles.card, className)} {...rest}>
      <div
        key={entity.id}
        className={styles.cardContainer}
        onClick={() => handleEntityClick(entity.id)}
      >
        <div
          className={classNames(
            styles.cardImage
            // isHPZero && styles.entityDeadImage
          )}
        >
          <img src={entity.image} alt={entity.name} />
          {/* {isHPZero && (
            <FontAwesomeIcon className={styles.deadIcon} icon="skull" />
          )} */}
        </div>
        <div className={styles.entityContent}>
          <div className={styles.entityName}>{entity.name}</div>
          {/* {entity.hp && ( */}
          <>
            <div className={styles.entityHP}>
              {showConditionsMenu && (
                <ConditionsDropdown
                  onConditionSelect={(condition) => {
                    console.log(condition);
                    handleConditionsClick(); // call handleConditionsClick to hide the menu
                  }}
                  onClose={toggleConditionsMenu}
                />
              )}
              <button
                className={styles.entityHPButton}
                onClick={handleConditionsClick}
              >
                <FontAwesomeIcon icon="plus" />
              </button>
              {/* <div className={styles.entityHPNumbers}>
                  {entity.hp[0]}/{entity.hp[1]}
                </div> */}
            </div>
            <StatsDisplay entity={entity} />
          </>
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
