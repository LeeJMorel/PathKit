import React from "react";
import styles from "./Menu.module.scss";
interface Props {
  label: string;
  onClick: () => void;
}

const MenuButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      {label}
    </button>
  );
};

export default MenuButton;
