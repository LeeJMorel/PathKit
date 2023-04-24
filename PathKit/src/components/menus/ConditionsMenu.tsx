import React, { useState } from "react";
import styles from "./ConditionsMenu.module.scss";
import { useConditions } from "../../hooks";

interface IConditionsMenuProps {
  onClose: () => void;
}

const ConditionsMenu: React.FC<IConditionsMenuProps> = ({ onClose }) => {
  const conditions = useConditions();
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleConditionClick = (condition: string) => {
    //conditions.applyCondition(condition);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.menuOverlay} onClick={handleClose}>
      <div className={styles.mainMenu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.conditionMenu}>
          <h2>Select Condition</h2>
          <ul>
            {/* {conditions.allConditions.map((condition) => (
              <li key={condition} title={`Apply condition ${condition.name}`} onClick={() => handleConditionClick(condition)}>
                {condition}
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConditionsMenu;
