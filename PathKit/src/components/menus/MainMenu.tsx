import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuInput from "./MenuInput";
import MenuButton from "./MenuButton";
import { usePreferenceStore, useStore, useTipStore } from "../../hooks";
import DeleteMenu from "./DeleteMenu";
import CampaignMenu from "./CampaignMenu";

enum Tab {
  Campaign = "Campaign",
  View = "View",
  Options = "Options",
}

enum visibleModules {
  DCModule = "DC",
  DiceModule = "Dice",
  NotesModule = "Notes",
}

interface IMainMenuProps {
  onClose: () => void;
}
const MainMenu: React.FC<IMainMenuProps> = ({ onClose }: IMainMenuProps) => {
  const plans = useStore((store) => store.plans);
  const { setCurrentTipIndex } = useTipStore();
  const [currentTab, setCurrentTab] = useState(Tab.Campaign);
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const { preferences, setPreferences } = usePreferenceStore();

  //placeholder until store can delete
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"entity" | "plan" | "campaign">(
    "entity"
  );
  const [deleteId, setDeleteId] = useState<string>("");

  const [showCampaignMenu, setShowCampaignMenu] = useState<boolean>(false);
  const [campaignType, setCampaignType] = useState<"Load" | "New">("Load");

  const handleTutorialBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setIsTutorial(checked);

    // Show tutorial tip
    if (checked) {
      setCurrentTipIndex(0);
    }
  };

  const handleLargeFontChange = () => {
    setPreferences({
      ...preferences,
      largeFont: !preferences.largeFont,
    });
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: theme } = event.target;
    console.log("radio change", theme);
    setPreferences({
      ...preferences,
      theme,
    });
  };

  const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: visibleModules } = event.target;
    setPreferences({
      ...preferences,
      visibleModules,
    });
  };

  const handlePlaceholder = () => {
    setIsTutorial(false);
  };

  const handleDelete = (type: "entity" | "plan" | "campaign", id: string) => {
    setShowDeleteMenu(true);
    setDeleteType(type);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setShowDeleteMenu(false);
  };

  const handleCampaignClose = () => {
    setShowCampaignMenu(false);
  };

  const handleCampaign = (type: "Load" | "New") => {
    setShowCampaignMenu(true);
    setCampaignType(type);
  };

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const handleClose = () => {
    onClose();
  };

  //im a placeholder!
  const [players, setPlayers] = useState([
    { id: "1", name: "Player 1" },
    { id: "2", name: "Player 2" },
    { id: "3", name: "Player 3" },
    { id: "4", name: "Player 4" },
  ]);

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        {showDeleteMenu && (
          <DeleteMenu
            type={deleteType}
            id={deleteId}
            onClose={handleDeleteClose}
          />
        )}
        {showCampaignMenu && (
          <CampaignMenu type={campaignType} onClose={handleCampaignClose} />
        )}
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
              <h2 className={styles.tabHeader}>Players</h2>
              <hr className={styles.tabHorizontalLine} />

              <div className={styles.menuScrollContainer}>
                {players.map((player) => (
                  <div key={player.id} className={styles.menuRowContainer}>
                    <div className={styles.menuTitle}>{player.name}</div>
                    <div
                      className={styles.deleteButton}
                      onClick={() => handleDelete("entity", "id")}
                    >
                      <FontAwesomeIcon icon="close" />
                    </div>
                  </div>
                ))}
              </div>
              <h2 className={styles.tabHeader}>Planned Events</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.menuScrollContainer}>
                {plans.map((plan) => (
                  <div key={plan.id} className={styles.menuRowContainer}>
                    <div className={styles.menuTitle}>
                      {plan.entities.map((entity, index) => (
                        <React.Fragment key={entity.id}>
                          {entity.name}
                          {index !== plan.entities.length - 1 ? ", " : ""}
                        </React.Fragment>
                      ))}
                    </div>
                    <div
                      className={styles.deleteButton}
                      onClick={() => handleDelete("plan", plan.id)}
                    >
                      <FontAwesomeIcon icon="close" />
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <div className={styles.menuRowContainer}>
                <MenuButton
                  label="Delete Campaign"
                  onClick={() => handleDelete("campaign", "id")}
                ></MenuButton>
                <MenuButton
                  label="Load Campaign"
                  onClick={() => handleCampaign("Load")}
                ></MenuButton>
                <MenuButton
                  label="Start New Campaign"
                  onClick={() => handleCampaign("New")}
                ></MenuButton>
              </div>
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
                  checked={preferences.visibleModules === "DC"}
                  type={"checkbox"}
                  name="visibleModule"
                  onChange={handleModuleChange}
                />
                <MenuInput
                  label="Notes Module"
                  checked={preferences.visibleModules === "Notes"}
                  type={"checkbox"}
                  name="visibleModule"
                  onChange={handleModuleChange}
                />
                <MenuInput
                  label="Dice Roller"
                  checked={preferences.visibleModules === "Dice"}
                  type={"checkbox"}
                  name="visibleModule"
                  onChange={handleModuleChange}
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
                  checked={preferences.largeFont}
                  type={"checkbox"}
                  name="largeFont"
                  value="Large Font"
                  onChange={handleLargeFontChange}
                />
                <MenuInput
                  label="High Contrast"
                  checked={preferences.theme === "highContrast"}
                  type={"radio"}
                  name="theme"
                  value="highContrast"
                  onChange={handleThemeChange}
                />
              </div>
              <h2 className={styles.tabHeader}>Color Themes</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabCheckboxContainer}>
                <MenuInput
                  label="Parchment"
                  checked={preferences.theme === "parchment"}
                  type={"radio"}
                  name="theme"
                  value="parchment"
                  onChange={handleThemeChange}
                />
                <MenuInput
                  label="Dark"
                  checked={preferences.theme === "dark"}
                  type={"radio"}
                  name="theme"
                  value="dark"
                  onChange={handleThemeChange}
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
