import React from "react";
import Button from "./Button";
import { PlanType } from "src/api/model";

interface IToggleButtonProps {
  options: PlanType[];
  value: PlanType;
  onChange: (value: PlanType) => void;
}

const ToggleButton: React.FC<IToggleButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  const handleOptionClick = (option: PlanType) => {
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
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default ToggleButton;
