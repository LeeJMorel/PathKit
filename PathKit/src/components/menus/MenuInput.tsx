import React from "react";

interface InputProps {
  label: string;
  checked?: boolean;
  type: "checkbox" | "radio";
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuInput: React.FC<InputProps> = ({
  label,
  checked,
  type,
  name,
  value,
  onChange,
}) => {
  return (
    <label style={{ margin: "0.5em" }}>
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
