import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface IButtonProps extends React.ComponentProps<"button"> {
  icon?: IconName | JSX.Element;
  primary?: boolean;
  subtle?: boolean;
  variant?:
    | "default"
    | "primary"
    | "subtle"
    | "destructive"
    | "text"
    | "toggle"
    | "toggleActive";
}

const Button: React.FC<IButtonProps> = ({
  primary,
  onClick,
  type = "button",
  className,
  children,
  variant = "default",
  icon,
  ...rest
}) => {
  const iconElement =
    typeof icon === "string" ? (
      <FontAwesomeIcon className={styles.buttonIcon} icon={["fas", icon]} />
    ) : (
      icon
    );

  return (
    <button
      className={classNames(styles.button, styles[variant], className)}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {icon && iconElement}
      {children && <span className={styles.buttonContent}>{children}</span>}
    </button>
  );
};

export default Button;
