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
    header: "Welcome to PathKit!",
    description:
      "Welcome to the PathKit Tutorial Demo! This is designed to bring you up to speed with the PathKit tool, as a new GM who has not played Pathfinder before!\n\nAs you may have noticed, you loaded the PathKit Tutorial Demo Campaign when you opened the app; as such you are now in a Campaign! PathKit allows you to load or create new campaigns, with each campaign containing all of the Paths (exploration or encounter mode events), NPCs, Monsters, Shops, etc that make it up. Don’t worry too much about all that right now, though. Instead, let’s jump into how to use PathKit!",
  },
  {
    id: 2,
    header: "UI Overview",
    description:
      "As you’ve probably noticed, the PathKit UI is broken up into three main sections:\n\nThe left-most section contains the Create button at the top left, the Path Scroller just below it, and the large Cards stack below that. You’ll currently see five PC cards in the Cards stack.\n\nThe middle section, the Notepad, is the main display area for PathKit. It will show GM notes, as well as detailed views of various NPCs, PCs, and Monsters. This area will also be where you can create & edit these things,\n\nThe right-most section is the Modules area, where you are reading these tips! As the name suggests, there are a variety of modules you can display in this area. Which modules are shown is controlled in the Menu, which is where we’re heading next. Click the hamburger icon at the upper right.",
  },
  {
    id: 3,
    header: "Menu & Modules",
    description:
      "This is the Menu! You’ll start in the Campaign tab, which allows you to Load, Delete, or Create a new Campaign. This tab also allows you to set players (PCs) as 'Present', which is useful if someone failed to show up for game night… like Birb the Bard, whose player isn’t here tonight. Uncheck that PC, and they’ll disappear from the Cards area.\n\nThe next tab is the Binder, which contains entries for all of your NPCs, Monsters, Shops, and other objects and persons involved in the campaign. Next up is the View tab - this is where you can control which modules are visible in the Modules area. Settings contains accessibility options, themes, and other settings pertaining to the program itself. Lastly, the About tab contains information about the dev team, as well as licenses.\n\nFeel free to change settings in the View tab, but be warned: these tips will disappear if you uncheck the Tutorial Tips module! When you’re finished, close the Menu to return to the main PathKit screen.",
  },
  {
    id: 4,
    header: "Jumping into Paths",
    description:
      "Alright, the time has come to jump into your game, and send your players down their first path to adventure. Specifically, their first Path - a PathKit term used to describe events which can be exploration events (shops, NPCs, etc) or combat encounters! Paths are shown in the Path Scroll, at the top of the left UI section. You’ll see two Paths for our demo; one exploration path, and one encounter path marked with a scary red dragon symbol. Rawr.\n\nOnce you and your players are ready, set the initial scene, and have them arrive at (and click on)... The Door.",
  },
  {
    id: 5,
    header: "Exploration",
    description:
      "Exploration paths do not involve combat, but can still contain NPCs, shops, structures, heck! Even monsters! So long as you’re not fighting them. Exploration paths are loosely tied to Exploration Mode in Pathfinder.\n\nYour players have arrived at the Door of the Dungeon, which is inconveniently locked. Feel free to click on The Door’s card in the Card stack to have its details appear in the Notepad. This will contain information you’ll need as the GM as the players make their attempts to get past the door - things like the Disable Device DC to pick the lock, or the door’s HP and Hardness if they simply beat it down.\n\nOnce they are past the door, you may set the scene for your players as they approach the first combat encounter. As they slink forward, the rats STRIKE! But before you click that scary red icon, let’s go over Initiative.",
  },
  {
    id: 6,
    header: "Roll for Initiative!",
    description:
      "As soon as you click on the Encounter, a box will pop up in the middle of your screen! This is the Initiative entry form - each party in the combat will have to roll their initiative (the GM rolls for monsters/NPCs, the players roll for their PCs). Once you have these numbers, enter them in the respective fields - let’s have the rats roll a 20, Merisiel roll an 18, and Kyra roll an 8.\n\nTa-da! The cards in the Card stack have magically re-arranged themselves into initiative order! If you need to re-order them at any time during the encounter, you can click and drag them to where you want them.",
  },
  {
    id: 7,
    header: "Combat Rundown: Turn 1",
    description:
      "Now that we have our parties in order, the party that has the largest value will go first, which would be the rats! Let’s see what happens when one of the rats makes an attack. We can find the rat’s attack modifier by clicking on the rats in the Card stack, which brings up their information. Adding that modifier to its d20 roll, let’s have the rat roll 19 total to hit Kyra. Seeing that Kyra’s AC is 18, we know that the attack–quite unfortunately–hits. We calculate the attack’s damage by following the details for it (located in the same rats info sheet). We apply the damage to Kyra’s health by clicking on her in the stack to bring up her sheet and change the value for her HP. We’ll skip the rest of this and the other rats’s turns for brevity’s sake.",
  },
  {
    id: 8,
    header: "Combat Rundown: Turn 2",
    description:
      "After the rats’s turn, it’s Merisiels turn! Instead of attacking, let’s see what happens when a condition needs to be applied. Merisiel is moving directly behind the rat that attacked Kyra in order to flank it with Kyra’s help. Thus, the rat gains the flat-footed condition. We can give the rat the flat-footed condition by opening their sheet and selecting the “flat-footed” condition for the given rat.\n\nThose are a couple of the basics for running combat in PathKit!",
  },
  {
    id: 9,
    header: "Making a Path",
    description:
      "Suppose that: after the encounter with the rats, instead of adventuring further into the dungeon, the players unexpectedly decide to go into the nearby town on a hungry quest for cookies. It just so happens that you–the GM–have previously prepared a baker NPC named “Gouda Baker”, and have them stored in the database! We can quickly make a path involving our good friend Gouda Baker by creating a path, and then clicking on the load button. We navigate to Gouda under the NPCs tab and select them. Save the path and click on it in our scroller, and now we can employ our fine cookie-seller into the Card stack for easy reference!",
  },
  {
    id: 10,
    header: "Thanks for trying Pathkit!",
    description:
      "Thank you for trying our introduction demo! Learning the rules of Pathfinder while also learning how PathKit works can be tough, and we hope this process made things easier to understand for you. Please contact our lead developer Lee Janzen if you have any questions. If you have a suggestion for improving the software’s accessibility or want to report a bug, you can make a feature request here: https://github.com/LeeJMorel/PathKit/issues/new/choose",
  },
];

function TutorialModule() {
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

export default TutorialModule;
