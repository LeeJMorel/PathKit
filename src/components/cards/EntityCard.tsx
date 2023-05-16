import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import uniqby from "lodash.uniqby";
import styles from "./Card.module.scss";
import { EntityType, IEntity } from "../../api/model";
import { usePreferencesStore, useBoolean, useEntities } from "../../hooks";
import ConditionsDropdown from "../dropdowns/ConditionsDropdown";
import { getPlayerMaxHp } from "../../utilities";
import { StatsDisplay } from "../displays/StatsDisplay";
import NPC from "../../assets/defaultImage/fighter.png";
import Player from "../../assets/defaultImage/knight.png";
import Monster from "../../assets/defaultImage/monster.png";
import Structure from "../../assets/defaultImage/store.png";
import Hazard from "../../assets/defaultImage/hazard.png";

interface EntityCardProps extends React.HTMLProps<HTMLDivElement> {
  entity: IEntity;
}

function EntityCard({ entity, className, ...rest }: EntityCardProps) {
  const { value: showConditionsMenu, toggle: toggleConditionsMenu } =
    useBoolean(false);
  const { preferences, setPreferences } = usePreferencesStore();
  const navigate = useNavigate();
  const { updateOrAddEntity, updateEntityById } = useEntities();
  const [maxHp, setMaxHp] = useState<number>(entity.maxHp || 0);

  useEffect(() => {
    if (entity.type === EntityType.Player) {
      const calculateMaxHp = async () => {
        const playerMaxHp = getPlayerMaxHp(entity);
        setMaxHp(playerMaxHp);
      };

      calculateMaxHp();
    }
  }, [entity]);

  const handleConditionsClick = useCallback(
    async (condition: string) => {
      const conditions = [
        ...entity.conditions,
        { name: condition, isValued: false },
      ];
      const uniqConditions = uniqby(conditions, "name");
      console.log({ condition, conditions, uniqConditions });
      toggleConditionsMenu();
      const newEntity = await updateEntityById({
        id: entity.id,
        conditions: uniqConditions,
      });
    },
    [entity]
  );

  const handleEntityClick = (id: number) => {
    const selectedSearch = null;
    setPreferences({
      selectedSearch,
    });
    navigate(`/entity/${entity.id}`);
  };

  const isHPZero =
    entity.type === EntityType.Player
      ? maxHp - (entity?.damage[0] || 0) <= 0
      : (entity.maxHp || 0) - (entity?.damage[0] || 0) <= 0;

  function getDefaultImage(type: EntityType) {
    switch (type) {
      case "Player":
        return Player;
      case "NPC":
        return NPC;
      case "Structure":
        return Structure;
      case "Hazard":
        return Hazard;
      default:
        return Monster;
    }
  }

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
            isHPZero &&
              entity.type !== EntityType.Structure &&
              styles.entityDeadImage
          )}
        >
          <img
            src={entity.image ? entity.image : getDefaultImage(entity.type)}
            alt={entity.name}
          />
          {isHPZero && entity.type !== EntityType.Structure && (
            <FontAwesomeIcon className={styles.deadIcon} icon="skull" />
          )}
        </div>
        <div className={styles.entityContent}>
          <div className={styles.entityName}>{entity.name}</div>
          {((entity.maxHp != null && entity.maxHp != undefined) ||
            maxHp > 0) && (
            <>
              <div className={styles.entityHP}>
                {showConditionsMenu && (
                  <ConditionsDropdown
                    onConditionSelect={(condition) => {
                      handleConditionsClick(condition); // call handleConditionsClick to hide the menu
                    }}
                    onClose={toggleConditionsMenu}
                  />
                )}
                <button
                  className={styles.entityHPButton}
                  onClick={toggleConditionsMenu}
                >
                  <FontAwesomeIcon icon="plus" />
                </button>
                {entity.type === EntityType.Player ? (
                  <div className={styles.entityHPNumbers}>
                    {maxHp - (entity?.damage[0] || 0)}/{maxHp}
                  </div>
                ) : (
                  <div className={styles.entityHPNumbers}>
                    {(entity?.maxHp ?? 0) - (entity?.damage[0] || 0)}/
                    {entity?.maxHp ?? 0}
                  </div>
                )}
              </div>
              <StatsDisplay entity={entity} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EntityCard;
