import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type ValidIconName = IconName;
interface Props extends React.HTMLProps<HTMLButtonElement> {
  icon?: ValidIconName;
  primary?: boolean;
  subtle?: boolean;
}

const Button: React.FC<Props> = ({
  primary,
  onClick,
  type,
  className,
  children,
  subtle,
  icon,
  ...rest
}) => {
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
      className={classNames(
        styles.button,
        primary && styles.primaryButton,
        subtle && styles.subtle,
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {iconElement}
      {children}
    </button>
  );
};

export default Button;
