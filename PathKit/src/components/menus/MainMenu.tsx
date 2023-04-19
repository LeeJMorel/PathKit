import React, { useState } from "react";
import styles from "./MainMenu.module.scss"; // Import your CSS/SCSS file for styling

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
            &times;
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Render content based on current tab */}
          {currentTab === Tab.Campaign && (
            <div className={styles.tabContent}>Campaign tab content</div>
          )}
          {currentTab === Tab.View && (
            <div className={styles.tabContent}>View tab content</div>
          )}
          {currentTab === Tab.Options && (
            <div className={styles.tabContent}>Options tab content</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;