import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./Card.module.scss";
import {
  EntityType,
  IEntity,
  PartialEntity,
  Proficiency,
} from "../../api/model";
import { usePreferencesStore, useBoolean, useEntities } from "../../hooks";
import ConditionsDropdown from "../dropdowns/ConditionsDropdown";
import { getPlayerMaxHp, getProficiencyModifier } from "../../utilities";
import { StatsDisplay } from "../displays/StatsDisplay";
import NPC from "../../assets/defaultImage/fighter.png";
import Player from "../../assets/defaultImage/knight.png";
import Monster from "../../assets/defaultImage/monster.png";
import Structure from "../../assets/defaultImage/store.png";
import { defaultEntity } from "../../consts";

interface EntityCardProps extends React.HTMLProps<HTMLDivElement> {
  entity: IEntity;
}

function EntityCard({ entity, className, ...rest }: EntityCardProps) {
  const { value: showConditionsMenu, toggle: toggleConditionsMenu } =
    useBoolean(false);
  const { preferences, setPreferences } = usePreferencesStore();
  const navigate = useNavigate();
  const { updateOrAddEntity, getEntityById } = useEntities();
  const [loading, setLoading] = useState(!!entity.id);
  const [maxHp, setMaxHp] = useState<number>(0);

  const [entityData, setEntityData] = useState<PartialEntity>({
    ...entity,
  });

  useEffect(() => {
    const matchEntity = getEntityById(Number(entity.id));
    if (matchEntity) {
      setEntityData(matchEntity);
      if (entity.type === EntityType.Player) {
        const calculateMaxHp = async () => {
          const playerMaxHp = getPlayerMaxHp(matchEntity);
          setMaxHp(playerMaxHp);
        };

        calculateMaxHp();
      }
    }
    setLoading(false);
  }, [entity.id]);

  const handleConditionsClick = async (condition: string) => {
    toggleConditionsMenu();
    console.log(condition);
    setEntityData((prevEntityData) => ({
      ...prevEntityData,
      conditions: [
        ...prevEntityData.conditions,
        { name: condition, isValued: false },
      ],
    }));
    updateOrAddEntity(entityData);
  };

  const handleEntityClick = (id: number) => {
    const selectedSearch = null;
    setPreferences({
      selectedSearch,
    });
    navigate(`/entity/${entity.id}`);
  };

  const isHPZero =
    entityData.type === EntityType.Player
      ? maxHp - (entityData?.damage[0] || 0) <= 0
      : (entityData.maxHp || 0) - (entityData?.damage[0] || 0) <= 0;

  function getDefaultImage(type: EntityType) {
    switch (type) {
      case "Player":
        return Player;
      case "NPC":
        return NPC;
      case "Shop":
        return Structure;
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
            isHPZero && styles.entityDeadImage
          )}
        >
          <img
            src={entity.image ? entity.image : getDefaultImage(entity.type)}
            alt={entity.name}
          />
          {isHPZero && (
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
                {entityData.type === EntityType.Player ? (
                  <div className={styles.entityHPNumbers}>
                    {maxHp - (entityData?.damage[0] || 0)}/{maxHp}
                  </div>
                ) : (
                  <div className={styles.entityHPNumbers}>
                    {(entityData?.maxHp ?? 0) - (entityData?.damage[0] || 0)}/
                    {entityData?.maxHp ?? 0}
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
