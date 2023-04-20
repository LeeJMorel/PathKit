import React, { useState } from "react";

interface InputProps {
  label: string;
  checked?: boolean;
  type: "checkbox" | "radio";
  name: string;
  onChange: (checked: boolean) => void;
}

const MenuInput: React.FC<InputProps> = ({
  label,
  checked,
  type,
  name,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <label style={{ margin: "0.5em" }}>
      <input
        type={type}
        checked={isChecked}
        name={name}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default MenuInput;
