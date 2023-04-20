import React, { useState } from "react";
import styles from "./MainMenu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuInput from "./MenuInput";
import MenuButton from "./MenuButton";

enum Tab {
  Campaign = "Campaign",
  View = "View",
  Options = "Options",
}

interface IMainMenuProps {
  onClose: () => void;
}
const MainMenu: React.FC<IMainMenuProps> = ({ onClose }: IMainMenuProps) => {
  const [currentTab, setCurrentTab] = useState(Tab.Campaign);
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  const handleTutorialBoxChange = (checked: boolean) => {
    setIsTutorial(checked);
  };

  const handlePlaceholder = () => {
    setIsTutorial(false);
  };

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              currentTab === Tab.Campaign ? styles.active : ""
            }`}
            onClick={() => handleTabClick(Tab.Campaign)}
          >
            Campaign
          </div>
          <div
            className={`${styles.tab} ${
              currentTab === Tab.View ? styles.active : ""
            }`}
            onClick={() => handleTabClick(Tab.View)}
          >
            View
          </div>
          <div
            className={`${styles.tab} ${
              currentTab === Tab.Options ? styles.active : ""
            }`}
            onClick={() => handleTabClick(Tab.Options)}
          >
            Options
          </div>
          <div className={styles.close} onClick={handleClose}>
            <FontAwesomeIcon icon="close" />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Render content based on current tab */}
          {currentTab === Tab.Campaign && (
            /*Campaign tab content, here we will do stuff like show the name of
              your campaign, start a new campaign, or load a campaign*/
            <div className={styles.tabContent}>
              <h2 className={styles.tabHeader}>Campaign Name</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabSubtext}>
                A Campaign description provided by the user when they make a new
                campaign
              </div>
              <br />
              <MenuButton
                label="Delete Campaign"
                onClick={handlePlaceholder}
              ></MenuButton>
              <MenuButton
                label="Load Campaign"
                onClick={handlePlaceholder}
              ></MenuButton>
              <MenuButton
                label="Start New Campaign"
                onClick={handlePlaceholder}
              ></MenuButton>
            </div>
          )}
          {currentTab === Tab.View && (
            /* View tab content, this controls the modules you view as well as if
              you can see the "tips" */
            <div className={styles.tabContent}>
              <h2 className={styles.tabHeader}>Helpful Tips</h2>
              <hr className={styles.tabHorizontalLine} />
              {/* Checkboxes need to be in a flex container so the words don't split weird */}
              <div className={styles.tabCheckboxContainer}>
                <MenuInput
                  label="Show Tutorial Tips"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
              </div>
              <h2 className={styles.tabHeader}>Visible Modules</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabCheckboxContainer}>
                <MenuInput
                  label="DC Adjustments Table"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
                <MenuInput
                  label="Notes Module"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
                <MenuInput
                  label="Dice Roller"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
              </div>
            </div>
          )}
          {currentTab === Tab.Options && (
            /* Options tab content, this controls accessibility features and color themes */
            <div className={styles.tabContent}>
              <h2 className={styles.tabHeader}>Accessibility</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabCheckboxContainer}>
                <MenuInput
                  label="Large Font"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
                <MenuInput
                  label="Colorblind Theme"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
              </div>
              <h2 className={styles.tabHeader}>Color Themes</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabCheckboxContainer}>
                <MenuInput
                  label="Parchment"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
                <MenuInput
                  label="Dark"
                  checked={isTutorial}
                  type={"checkbox"}
                  name="PLACEHOLDER"
                  onChange={handleTutorialBoxChange}
                />
              </div>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabSubtext}>
                Make gaming accessible for everyone! Make a{" "}
                <a
                  href="https://github.com/LeeJMorel/PathKit/issues/new/choose"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  feature request
                </a>{" "}
                to provide suggestions on improving the software's
                accessibility.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
