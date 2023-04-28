import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type ValidIconName = IconName;
interface Props extends React.HTMLProps<HTMLButtonElement> {
  icon?: ValidIconName;
}

const RoundButton: React.FC<Props> = ({
  onClick,
  type,
  className,
  children,
  icon,
  ...rest
}) => {
  const validIcons: ValidIconName[] = [
    "check-circle",
    "times-circle",
    "file-circle-plus",
  ];

  const iconElement =
    typeof icon === "string" ? (
      <FontAwesomeIcon
        className={styles.roundButtonIcon}
        icon={["fas", icon as IconName]}
      />
    ) : (
      icon
    );

  return (
    <button
      type="button"
      className={classNames(styles.roundButton, className)}
      onClick={onClick}
      {...rest}
    >
      {iconElement}
      {children}
    </button>
  );
};

export default RoundButton;
