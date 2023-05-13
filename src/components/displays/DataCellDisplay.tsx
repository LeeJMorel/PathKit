import React from "react";
import classNames from "classnames";
import styles from "./Display.module.scss";

export interface IDataCellProps {
  name: string;
  value: any;
  label?: React.ReactNode;
  labelPosition?: "above" | "inline";
  className?: string;
  small?: boolean;
  width?: number | string;
  align?: "start" | "center" | "end";
}

export const DataCellDisplay: React.FC<IDataCellProps> = ({
  label,
  labelPosition = "inline",
  align = "start",
  className,
  small,
  width,
  value,
}) => {
  return (
    <div
      className={classNames(
        styles.displayContainer,
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
        <div className={styles.textInput}>{value}</div>
      </div>
    </div>
  );
};

export default DataCellDisplay;
