import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import styles from "./Objects.module.scss";

type ValidIconName = IconName;

interface Props {
  icon: IconName;
  number: string | number;
  label?: string;
}

const StatObject: React.FC<Props> = ({ icon, number, label }) => {
  const iconElement =
    typeof icon === "string" ? (
      <FontAwesomeIcon
        className={styles.statIcon}
        icon={["fas", icon as IconName]}
      />
    ) : (
      icon
    );
  return (
    <div className={styles.statObject}>
      <div className={styles.statIconContainer}>{iconElement}</div>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

export default StatObject;
