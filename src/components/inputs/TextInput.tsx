import React, { useRef, useState, useCallback } from "react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import { GenericInputElement, IInputProps } from "./Inputs.types";
import styles from "./Inputs.module.scss";

export interface ITextInputProps extends IInputProps<GenericInputElement> {}

export const TextInput = React.forwardRef(
  (
    {
      label,
      name,
      value,
      validation,
      onValidation,
      onChange,
      errorMessage,
      required,
      getIsRequired,
      type = "text",
      width,
      fluid,
      multiline,
      className,
      ...rest
    }: ITextInputProps,
    ref: React.ForwardedRef<GenericInputElement>
  ) => {
    console.log("debug: textInput", { name, value });
    const [isValid, setIsValid] = useState(true);
    const isRequired = useRef<boolean>(
      required || (typeof getIsRequired === "function" && getIsRequired())
    );

    const debouncedValidate = debounce(async (val) => {
      if (typeof validation === "function") {
        const valid = await validation(val);
        console.log("isValid", { valid });
        setIsValid(await validation(val));
        if (typeof onValidation === "function") {
          onValidation(name, valid);
        }
      }
    }, 500);

    const handleChange = useCallback(
      (event: React.ChangeEvent<GenericInputElement>) => {
        console.log("debug: textinput handlechange", { event });
        if (typeof onChange === "function") {
          onChange(name, event.target.value);
        }
        debouncedValidate(event.target.value);
      },
      [onChange]
    );

    const Input = multiline ? "textarea" : "input";

    return (
      <div className={classNames(styles.formFieldContainer, className)}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <Input
            type={type}
            ref={ref}
            required={isRequired.current}
            onChange={handleChange}
            className={styles.input}
            name={name}
            value={value}
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

export default TextInput;
