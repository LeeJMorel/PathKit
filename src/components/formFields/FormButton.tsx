import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./FormField.module.scss";
import Button, { IButtonProps } from "../buttons/Button";

export interface IFormButtonProps extends IButtonProps {}

/** Wrapper for the normal button so it can stay inline with other inputs */
export const FormButton: React.FC<IFormButtonProps> = (props) => {
  return (
    <div className={classNames(styles.fieldContainer, styles.inputButton)}>
      <div className={styles.inputContainer}>
        <Button {...props} />
      </div>
    </div>
  );
};

export default FormButton;
