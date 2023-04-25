import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

const RoundButton: React.FC<Props> = ({
  onClick,
  type,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.roundButton, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default RoundButton;
