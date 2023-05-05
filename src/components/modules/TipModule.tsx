import React, { useState } from "react";
import styles from "./Modules.module.scss";
import { Button, RoundButton } from "../buttons";

interface ITip {
  id: number | number;
  header: string;
  description: string;
}

const TIPS: ITip[] = [
  {
    id: 1,
    header: "Helpful Tips",
    description:
      "Now that you have created a campaign, you'll find some tips on how to use PathKit here! \n\nLet's start with the menu, its how you will control most of your campaign and get helpful information. To open the menu, click the icon to the upper right in the header. In here you will find four tabs: Campaign, Binder, View, and Options. \n\n# Click the right arrow button to go to the next tip and learn more.",
  },
  {
    id: 2,
    header: "Menu",
    description:
      "\n\n# Campaign \n\nThis tab will help you control campaign details, such as loading, deleting, and starting new campaigns, as well as temporarily removing players in case they are absent. \n\n# Binder \n\nFrom here you can edit or delete any custom information you store such as plans, notes, players, NPCs and more. You can view the Binder at anytime in the menu, or you can also view it as a module. \n\n# View \n\nPathKit's far right screen is where you can hold any amount of useful data and information. We call this information modules. Under view you can control which modules are visible to you, allowing you to only view what you need when you need it. \n\n# Options \n\nHere you can customize PathKit's appearance. We have a number of accessibility focused features, as well as color themes you can use to create the best GM experience.",
  },
];

function TipModule() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const currentTip = TIPS[currentTipIndex];

  const handlePreviousTip = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    } else {
      setCurrentTipIndex(TIPS.length - 1);
    }
  };

  const handleNextTip = () => {
    if (currentTipIndex < TIPS.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    } else {
      setCurrentTipIndex(0);
    }
  };

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.moduleHeader}>
        <RoundButton small icon="angle-left" onClick={handlePreviousTip} />
        <h2>{currentTip.header}</h2>
        <RoundButton small icon="angle-right" onClick={handleNextTip} />
      </div>

      <div className={styles.moduleContent}>
        <div className={styles.tipBody}>
          {currentTip.description.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("# ")) {
              // Header
              const headerText = paragraph.slice(2);
              return <h3 key={index}>{headerText}</h3>;
            } else {
              // Paragraph
              return <p key={index}>{paragraph}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default TipModule;
