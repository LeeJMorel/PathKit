import React from "react";
import Button, { IButtonProps } from "./Button";

interface IToggleButtonProps extends Omit<IButtonProps, "onChange"> {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleButton: React.FC<IToggleButtonProps> = ({
  options,
  value,
  onChange,
  ...rest
}) => {
  const handleOptionClick = (option: string) => {
    if (value !== option) {
      onChange(option);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <Button
          key={option}
          variant={value === option ? "toggleActive" : "toggle"}
          onClick={() => handleOptionClick(option)}
          {...rest}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default ToggleButton;
