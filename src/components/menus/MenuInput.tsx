import React from "react";
import styles from "./Menu.module.scss";

interface InputProps {
  label?: string;
  title?: string;
  checked?: boolean;
  type: "checkbox" | "radio";
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuInput: React.FC<InputProps> = ({
  label,
  title,
  checked,
  type,
  name,
  value,
  onChange,
}) => {
  const labelClassName = label ? styles.input : styles.inputLarge;

  return (
    <label title={title} className={labelClassName}>
      <input
        type={type}
        checked={checked}
        name={name}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default MenuInput;
