import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "../buttons";

interface ICollapsibleHeaderProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "as"> {
  title: string;
  toggle?: boolean;
  align?: "start" | "center" | "end";
  headingProps?: React.HTMLProps<HTMLHeadingElement>;
  defaultCollapsed?: boolean;
  as?: React.ElementType;
  onRemove?: () => void;
}

const CollapsibleHeader = ({
  title,
  toggle = true,
  children,
  className,
  headingProps,
  align = "start",
  defaultCollapsed = false,
  as = "h3",
  onRemove,
  ...rest
}: ICollapsibleHeaderProps): JSX.Element => {
  const [collapsed, setIsCollapsed] = useState<boolean>(
    toggle && defaultCollapsed
  );
  const contentContainer = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentContainer.current) {
      // Set initial height
      setContentHeight(contentContainer.current.scrollHeight);
      setTimeout(() => {
        // Fix for react rendering changing height, and more for drop shadows
        setContentHeight((contentContainer?.current?.scrollHeight || 0) + 4);
      }, 100);
    }
  }, [contentContainer.current?.scrollHeight]);

  const toggleCollapsed = (): void => {
    setIsCollapsed(!collapsed);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (typeof onRemove === "function") {
      onRemove();
    }
  };

  const Heading = as;

  return (
    <>
      <div
        className={classNames(styles.header, styles[align])}
        onClick={toggle ? toggleCollapsed : undefined}
      >
        <Heading
          {...headingProps}
          className={classNames(styles.heading, headingProps?.className)}
        >
          {title}
        </Heading>
        {onRemove && (
          <Button
            onClick={handleRemove}
            icon="close"
            variant="text"
            className={styles.removeButton}
          />
        )}
        {toggle && (
          <FontAwesomeIcon
            icon="angle-double-down"
            className={classNames(
              styles.headerIcon,
              collapsed && styles.collapsed
            )}
          />
        )}
      </div>
      <div
        className={classNames(toggle && styles.collapsible, className)}
        {...rest}
        ref={toggle ? contentContainer : undefined}
        style={
          toggle
            ? {
                height: collapsed ? "0px" : `${contentHeight}px`,
              }
            : undefined
        }
      >
        {children}
      </div>
    </>
  );
};

export default CollapsibleHeader;
