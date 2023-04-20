import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const MenuButton: React.FC<Props> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default MenuButton;
