import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import Button, { IButtonProps } from "./Button";

interface IRoundButtonProps extends IButtonProps {
  small?: boolean;
}

const RoundButton: React.FC<IRoundButtonProps> = ({
  // onClick,
  // type,
  className,
  children,
  icon,
  small,
  // subtle,
  variant = "default",
  ...rest
}) => {
  const iconElement =
    typeof icon === "string" ? (
      <FontAwesomeIcon
        className={styles.buttonIcon}
        icon={["fas", icon as IconName]}
      />
    ) : (
      icon
    );

  return (
    <Button
      type="button"
      className={classNames(
        styles.roundButton,
        small && styles.small,
        styles[variant],
        className
      )}
      {...rest}
    >
      {iconElement}
      {children}
    </Button>
  );
};

export default RoundButton;
