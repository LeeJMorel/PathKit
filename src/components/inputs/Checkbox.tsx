import React, { useRef, useState } from "react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import { GenericInputElement, IInputProps } from "./Inputs.types";
import styles from "./Inputs.module.scss";

export interface ICheckboxProps extends IInputProps<GenericInputElement> {}

export const Checkbox = React.forwardRef(
  (
    {
      label,
      name,
      required,
      type = "checkbox",
      validation,
      onValidation,
      onChange,
      errorMessage,
      getIsRequired,
      width,
      fluid,
      multiline,
      className,
      ...rest
    }: ICheckboxProps,
    ref: React.ForwardedRef<GenericInputElement>
  ) => {
    const [isValid, setIsValid] = useState(true);
    const isRequired = useRef<boolean>(
      required || (typeof getIsRequired === "function" && getIsRequired())
    );

    const debouncedValidate = debounce(async (val) => {
      if (typeof validation === "function") {
        const valid = await validation(val);
        setIsValid(await validation(val));
        if (typeof onValidation === "function") {
          onValidation(name, valid);
        }
      }
    }, 500);

    const handleChange = (event: React.ChangeEvent<GenericInputElement>) => {
      if (typeof onChange === "function") {
        onChange(name, event.target.checked);
      }
      debouncedValidate(event.target.checked);
    };

    return (
      <div className={classNames(styles.formFieldContainer, className)}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <input
            type={type}
            ref={ref}
            required={isRequired.current}
            onChange={handleChange}
            className={styles.checkbox}
            name={name}
            id={name}
            {...rest}
          />
        </div>
        {!isValid && (
          <div className={styles.errorMessageContainer}>
            <span className={styles.errorMessage}>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

export default Checkbox;
