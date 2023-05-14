import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import classNames from "classnames";
import styles from "./FormField.module.scss";

export interface IFieldProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "as" | "label"> {
  name: string;
  value?: any;
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
  type,
  ...inputProps
}) => {
  const [field, meta] = useField({ as, type, ...inputProps });
  const fieldClassName = classNames(
    styles.formInput,
    meta.touched && meta.error && styles.hasError,
    type === "number" && styles.number,
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
    >
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
        </div>
      )}
      <div className={styles.inputContainer} style={{ maxWidth: width }}>
        {as ? (
          <Field
            className={fieldClassName}
            type={type}
            {...field}
            {...inputProps}
            as={as}
          />
        ) : (
          <input
            className={fieldClassName}
            type={type}
            {...field}
            {...inputProps}
          />
        )}
        {meta.touched && meta.error && (
          <div className={styles.error}>{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default FormField;
