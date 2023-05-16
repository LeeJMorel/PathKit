import React from "react";
import styles from "./Sheets.module.scss";
import { Button } from "../buttons";
import classNames from "classnames";
import { string } from "yup";

export interface ISheetHeaderProps {
  title: React.ReactNode;
  titleAs?: React.ElementType;
  subtitle?: React.ReactNode;
  onEditClick?: () => void;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  nested?: boolean;
  className?: string;
}

export const SheetHeader: React.FC<ISheetHeaderProps> = ({
  title,
  titleAs = "h2",
  subtitle,
  onEditClick,
  onBackClick,
  onCloseClick,
  nested,
  className,
}) => {
  const Heading = titleAs;
  return (
    <div
      className={classNames(
        styles.header,
        nested && styles.nestedHeader,
        className
      )}
    >
      <div className={styles.title}>
        <Heading className={styles.heading}>{title}</Heading>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <div className={styles.headerButtons}>
        {typeof onEditClick === "function" && (
          <Button
            className={styles.headerButton}
            variant="text"
            onClick={onEditClick}
            icon="pencil"
          >
            Edit
          </Button>
        )}
        {typeof onBackClick === "function" && (
          <Button
            className={styles.headerButton}
            variant="text"
            onClick={onBackClick}
            icon="arrow-left"
            title={`Close ${title} sheet`}
          />
        )}
        {typeof onCloseClick === "function" && (
          <Button
            className={classNames(styles.headerButton, styles.closeButton)}
            variant="text"
            onClick={onCloseClick}
            icon="close"
            title={`Close ${title} sheet`}
          />
        )}
      </div>
    </div>
  );
};
