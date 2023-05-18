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
  const [field, meta, helpers] = useField({ as, type, ...inputProps });
  const fieldClassName = classNames(
    styles.formInput,
    meta.touched && meta.error && styles.hasError,
    type === "number" && styles.number,
    type === "checkbox" && styles.checkbox,
    inputClassName
  );

  const handleCheck = () => {
    if (type === "checkbox" || type === "radio") {
      helpers.setValue(!field.checked);
      helpers.setTouched(true);
    }
  };

  const renderInput = () => {
    if (as) {
      return (
        <Field
          className={fieldClassName}
          type={type}
          {...field}
          {...inputProps}
          as={as}
        />
      );
    }
    if (type === "checkbox") {
      return (
        <>
          <div
            className={classNames(
              styles.checkboxBack,
              field.checked && styles.checked
            )}
            role="checkbox"
            aria-checked={field.checked}
          >
            <div className={styles.checkboxFront} />
          </div>
          <input
            className={fieldClassName}
            type={type}
            {...field}
            {...inputProps}
          />
        </>
      );
    }
    return (
      <input
        className={fieldClassName}
        type={type}
        {...field}
        {...inputProps}
      />
    );
  };
  return (
    <div
      className={classNames(
        styles.fieldContainer,
        styles[labelPosition],
        styles[align],
        small && styles.small,
        type === "checkbox" && styles.isCheckbox,
        type === "radio" && styles.isRadio,
        className
      )}
      onClick={handleCheck}
    >
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
        </div>
      )}
      <div className={styles.inputContainer} style={{ maxWidth: width }}>
        {renderInput()}
        <ErrorMessage {...field} component="div" className={styles.error} />
      </div>
    </div>
  );
};

export default FormField;
