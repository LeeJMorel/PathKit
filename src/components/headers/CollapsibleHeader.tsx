import React, { useState, useRef, useEffect, useCallback } from "react";
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
  onCollapsed?: (collapased: boolean) => void;
  nested?: boolean;
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
  onCollapsed,
  nested,
  ...rest
}: ICollapsibleHeaderProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    toggle && defaultCollapsed
  );
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);
  const contentContainer = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const timer = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (contentContainer.current) {
      // Set initial height
      setContentHeight(contentContainer.current.scrollHeight);
      setTimeout(() => {
        setContentHeight(contentContainer?.current?.scrollHeight || 0);
      }, 100);
    }
  }, [contentContainer.current?.scrollHeight]);

  const toggleCollapsed = useCallback(() => {
    if (typeof onCollapsed === "function") {
      onCollapsed(!isCollapsed);
    }
    setIsCollapsing(true);
    timer.current = setTimeout(() => {
      setIsCollapsing(false);
    }, 200);
    setIsCollapsed(!isCollapsed);
  }, [timer, isCollapsed, isCollapsing]);

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
        className={classNames(
          styles.header,
          styles[align],
          nested && styles.nested
        )}
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
              isCollapsed && styles.collapsed
            )}
          />
        )}
      </div>
      <div
        className={classNames(
          styles.content,
          toggle && styles.collapsible,
          isCollapsing && styles.collapsing,
          isCollapsed && styles.collapsed,
          nested && styles.nested,
          className
        )}
        {...rest}
        ref={toggle ? contentContainer : undefined}
        style={
          toggle
            ? {
                height: isCollapsed ? "0px" : `${contentHeight}px`,
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
