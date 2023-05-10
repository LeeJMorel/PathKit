import React from "react";
import Button from "./Button";
import { PathType } from "src/api/model";

interface IToggleButtonProps {
  options: PathType[];
  value: PathType;
  onChange: (value: PathType) => void;
}

const ToggleButton: React.FC<IToggleButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  const handleOptionClick = (option: PathType) => {
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
