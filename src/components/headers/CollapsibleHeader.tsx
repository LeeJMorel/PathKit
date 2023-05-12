import React, { useState } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICollapsibleHeaderProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  toggle?: boolean;
}

const CollapsibleHeader = ({
  title,
  toggle,
  children,
  className,
  ...rest
}: ICollapsibleHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.header} onClick={toggle ? toggleOpen : undefined}>
        <h3>{title}</h3>
        {toggle && (
          <FontAwesomeIcon
            icon={isOpen ? "angle-double-down" : "angle-double-up"}
          />
        )}
      </div>
      {isOpen && (
        <div className={className} {...rest}>
          {children}
        </div>
      )}
    </>
  );
};

export default CollapsibleHeader;
