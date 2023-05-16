import React from "react";
import StatObject from "../objects/StatObject";
import { IEntity, PartialEntity, Proficiency } from "../../api/model/entity";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { getProficiencyModifier } from "../../utilities";
import styles from "./Display.module.scss";
import classNames from "classnames";

interface StatsDisplayProps {
  entity: IEntity | PartialEntity;
  labelPosition?: "above";
  className?: string;
}

interface StatInfo {
  icon: IconName;
  label?: string;
  detailLabel: string;
}

const statInfo: Record<string, StatInfo> = {
  ac: { icon: "shield", label: "ac", detailLabel: "AC" },
  fortitude: { icon: "circle", label: "f", detailLabel: "Fortitude" },
  will: { icon: "circle", label: "w", detailLabel: "Will" },
  reflex: { icon: "circle", label: "r", detailLabel: "Reflex" },
  dc: { icon: "star", label: "dc", detailLabel: "DC" },
};

export const StatsDisplay = ({
  entity,
  className,
  labelPosition,
}: StatsDisplayProps) => {
  const stats = {
    ac: entity.build.acTotal.acTotal,
    fortitude: getProficiencyModifier(entity, Proficiency.fortitude),
    will: getProficiencyModifier(entity, Proficiency.will),
    reflex: getProficiencyModifier(entity, Proficiency.reflex),
    dc: getProficiencyModifier(entity, Proficiency.classDC),
  };

  return (
    <div className={styles.entityStats}>
      {Object.entries(stats).map(([statKey, stat]) => {
        const { icon, label, detailLabel } = statInfo[statKey];
        return (
          <div
            key={statKey}
            className={classNames(
              styles.entityStat,
              labelPosition && styles[labelPosition],
              className
            )}
            title={`${label}: ${stat}`}
          >
            {labelPosition && (
              <div className={styles.labelContainer}>
                <label className={styles.label}>{detailLabel}</label>
              </div>
            )}
            <StatObject icon={icon} number={Number(stat) || 0} label={label} />
          </div>
        );
      })}
    </div>
  );
};
