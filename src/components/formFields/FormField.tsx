import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import classNames from "classnames";
import styles from "./FormField.module.scss";

export interface IFieldProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "as" | "label"> {
  name: string;
  value: any;
  label?: React.ReactNode;
  labelPosition?: "above" | "inline";
  className?: string;
  inputClassName?: string;
  small?: boolean;
  width?: number | string;
  as?: React.ElementType;
  align?: "start" | "center" | "end";
}

export const FormField: React.FC<IFieldProps> = ({
  label,
  labelPosition = "inline",
  align = "start",
  className,
  inputClassName,
  small,
  width,
  as,
  ...inputProps
}) => {
  const [field, meta] = useField({ as, ...inputProps });
  const fieldClassName = classNames(
    styles.formInput,
    meta.error && styles.hasError,
    inputClassName
  );
  return (
    <div
      className={classNames(
        styles.fieldContainer,
        styles[labelPosition],
        styles[align],
        small && styles.small,
        className
      )}
      style={{ width }}
    >
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
        </div>
      )}
      <div className={styles.inputContainer}>
        {as ? (
          <Field
            className={fieldClassName}
            {...field}
            {...inputProps}
            as={as}
          />
        ) : (
          <input className={fieldClassName} {...field} {...inputProps} />
        )}
        {meta.touched && meta.error && (
          <div className={styles.error}>{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default FormField;