import React from "react";
import styles from "./Menu.module.scss";
interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const MenuButton: React.FC<Props> = ({ label, onClick, disabled }) => {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      {label}
    </button>
  );
};

export default MenuButton;
