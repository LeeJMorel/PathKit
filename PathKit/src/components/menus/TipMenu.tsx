import React from "react";
import styles from "./Menu.module.scss";
import MenuButton from "./MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTipStore } from "../../hooks";

interface ITip {
  id: number;
  header: string;
  description: string;
}

const TIPS: ITip[] = [
  {
    id: 1,
    header: "Tip 1",
    description: "This is the first tip.",
  },
  {
    id: 2,
    header: "Tip 2",
    description: "This is the second tip.",
  },
  {
    id: 3,
    header: "Tip 3",
    description: "This is the third tip.",
  },
];

const TipMenu: React.FC = () => {
  const { currentTipIndex, setCurrentTipIndex } = useTipStore();

  const currentTip = TIPS[currentTipIndex];

  const handlePreviousTip = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    }
  };

  const handleNextTip = () => {
    if (currentTipIndex < TIPS.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    }
  };

  return (
    <div className={styles.tipsMenu}>
      <h2>{currentTip.header}</h2>
      <div className={styles.close} onClick={() => setCurrentTipIndex(0)}>
        <FontAwesomeIcon icon="close" />
      </div>

      <div className={styles.tipBody}>{currentTip.description}</div>
      <div className={styles.tipArrowContainer}>
        <div className={styles.menuButtons} onClick={handlePreviousTip}>
          <FontAwesomeIcon icon="circle-chevron-left" />
        </div>
        <div className={styles.menuButtons} onClick={handleNextTip}>
          <FontAwesomeIcon icon="circle-chevron-right" />
        </div>
      </div>
    </div>
  );
};

export default TipMenu;
