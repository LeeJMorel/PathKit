import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

const Button: React.FC<Props> = ({
  onClick,
  type,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
