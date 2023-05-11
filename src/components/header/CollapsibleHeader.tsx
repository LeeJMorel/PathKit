import React, { useState } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  toggle?: boolean;
  children?: React.ReactNode;
}

const CollapsibleHeader = ({ title, toggle, children }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.header} onClick={toggle ? toggleOpen : undefined}>
        <h3>{title}</h3>
        {toggle && (
          <FontAwesomeIcon
            icon={isOpen ? "angle-double-down" : "angle-double-up"}
          />
        )}
      </div>
      {isOpen && children}
    </div>
  );
};

export default CollapsibleHeader;
