import React, { useState } from "react";
import styles from "./Modules.module.scss";
import { Button, RoundButton } from "../buttons";

interface ITip {
  id: number;
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
      "\n\n# Campaign \n\nThis tab will help you control campaign details, such as loading, deleting, and starting new campaigns, as well as temporarily removing players in case they are absent. \n\n# Binder \n\nFrom here you can edit or delete any custom information you store such as paths, notes, players, NPCs and more. You can view the Binder at anytime in the menu, or you can also view it as a module. \n\n# View \n\nPathKit's far right screen is where you can hold any amount of useful data and information. We call this information modules. Under view you can control which modules are visible to you, allowing you to only view what you need when you need it. \n\n# Options \n\nHere you can customize PathKit's appearance. We have a number of accessibility focused features, as well as color themes you can use to create the best GM experience.",
  },
  {
    id: 3,
    header: "Create",
    description:
      "The create button is located to the top left on the main view of PathKit. It allows you to add whatever entities, notes, or paths you need related to your campaign, which are then added to the binder. \n\n# Create a Player \n\nCreates a player-controlled character who is then added to the initiative order (which can be toggled in the Campaign menu tab.) \n\n# Create a Path \n\nCreates an encounter or exploration path, which is then added to the path scroller to the upper-left of PathKit. Check the next tip for an overview of paths.\n\n# Create a Note \n\nCreates a note that is added to the binder like other creations.\n\n# Create an NPC \n\nCreates an NPC that can be used in future plans by loading from the binder.\n\n# Create a Monster \n\nCreates a monster that can be used in future plans by loading from the binder.",
  },
  {
    id: 4,
    header: "Paths",
    description:
      "Paths are a critical part of using PathKit. They are used for events the GM has prepared in advance. They are comprised of any assortment of entities, excluding players. After being created, they are held in the path scroller, located above the initiative order. (The initiative order is on the left side of the screen and will appear empty if no players are active and no plans are loaded.) You click on a path in the scroller to add its contents to the initiative order, where they can be clicked on to view their information in the middle section of the screen. Active paths can be closed when they are no longer needed by clicking on the X button in the header above the scroller. There are two types of paths you can make:\n\n# Encounter Paths \n\nAn encounter is when something prompts the players to roll initiative. Encounter paths are created for such events. When encounter paths are clicked on in the scroller, a popup will collect initiative roll results from the involved entities before adding the path's entities to the initiative order. \n\n# Exploration Paths \n\nAn exploration path is meant for interactions with entities outside of an encounter. Unlike encounter paths, they do not prompt for initiative roll results. Instead, its contents are simply added to the initiative order for easy reference.",
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
