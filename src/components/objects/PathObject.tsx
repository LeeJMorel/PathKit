import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Objects.module.scss";
import { EntityType, IPath, PathType } from "../../api/model";
import { usePreferencesStore, useEntities } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NPC from "../../assets/defaultImage/fighter.png";
import Player from "../../assets/defaultImage/knight.png";
import Monster from "../../assets/defaultImage/monster.png";
import Structure from "../../assets/defaultImage/store.png";
import Hazard from "../../assets/defaultImage/hazard.png";

export interface PathObjectProps {
  path: IPath;
}

function PathObject({ path }: PathObjectProps) {
  const { entities: entities, type: pathType } = path;
  const { getEntitiesById } = useEntities();
  const pathEntities = getEntitiesById(entities);
  const { setPreferences } = usePreferencesStore();
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    setPreferences({ selectedPath: path.id });
  };
  const tooltipId = `tooltip-${path.id}`;

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
    <div
      className={styles.path}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-tooltip-id={tooltipId}
    >
      {pathEntities.map((entity, i) => {
        if (i < 4) {
          return (
            <img
              key={entity.id}
              src={entity.image ? entity.image : getDefaultImage(entity.type)}
              alt={entity.name}
              className={classNames(pathEntities.length > 1 && styles.grid)}
            />
          );
        }
      })}
      {pathEntities.length > 4 && <div className={styles.fourPlus}>+</div>}
      {pathType === PathType.encounter && (
        <>
          <div className={styles.overlay}></div>
          <FontAwesomeIcon className={styles.sword} icon="dragon" />
        </>
      )}
      {isHovering && (
        <div className={styles.tooltip}>
          {pathEntities.map((e) => e.name).join(",\n")}
        </div>
      )}
    </div>
  );
}

export default PathObject;
