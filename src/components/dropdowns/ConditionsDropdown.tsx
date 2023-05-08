import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks";
import styles from "./Dropdown.module.scss";

type ConditionOption = {
  label: string;
  value: string;
};

const conditions: ConditionOption[] = [
  { label: "Blinded", value: "blinded" },
  { label: "Clumsy", value: "clumsy" },
  { label: "Concealed", value: "concealed" },
  { label: "Confused", value: "confused" },
  { label: "Dazzled", value: "dazzled" },
  { label: "Deafened", value: "deafened" },
  { label: "Doomed", value: "doomed" },
  { label: "Drained", value: "drained" },
  { label: "Dying", value: "dying" },
  { label: "Enfeebled", value: "enfeebled" },
  { label: "Fascinated", value: "fascinated" },
  { label: "Fatigued", value: "fatigued" },
  { label: "Flat-Footed", value: "flatFooted" },
  { label: "Fleeing", value: "fleeing" },
  { label: "Friendly", value: "friendly" },
  { label: "Frightened", value: "frightened" },
  { label: "Grabbed", value: "grabbed" },
  { label: "Hidden", value: "hidden" },
  { label: "Hostile", value: "hostile" },
  { label: "Immobilized", value: "immobilized" },
  { label: "Indifferent", value: "indifferent" },
  { label: "Invisible", value: "invisible" },
  { label: "Observed", value: "observed" },
  { label: "Paralyzed", value: "paralyzed" },
  { label: "Persistent Damage", value: "persistentDamage" },
  { label: "Petrified", value: "petrified" },
  { label: "Prone", value: "prone" },
  { label: "Quickened", value: "quickened" },
  { label: "Restrained", value: "restrained" },
  { label: "Sickened", value: "sickened" },
  { label: "Slowed", value: "slowed" },
  { label: "Stunned", value: "stunned" },
  { label: "Unconscious", value: "unconscious" },
];

interface ConditionDropdownProps {
  onConditionSelect: (condition: string) => void;
  onClose?: () => void;
}

const ConditionsDropdown: React.FC<ConditionDropdownProps> = ({
  onConditionSelect,
  onClose,
}) => {
  const [selectedCondition, setSelectedCondition] =
    useState<ConditionOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };
  useOnClickOutside(dropdownRef, handleClose);

  const handleConditionSelect = (option: ConditionOption | null) => {
    setSelectedCondition(option);
    if (option) {
      onConditionSelect(option.value);
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.menuDropdown}>
        <div className={styles.optionsContainer}>
          {conditions.map((option) => (
            <div
              className={styles.option}
              key={option.value}
              onClick={() => handleConditionSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConditionsDropdown;
