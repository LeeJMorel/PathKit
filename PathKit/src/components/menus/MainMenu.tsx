import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuInput from "./MenuInput";
import Button from "../buttons/Button";
import {
  usePreferencesStore,
  useStore,
  useTipStore,
  useEntities,
  useCampaigns,
} from "../../hooks";
import DeleteMenu from "./DeleteMenu";
import CampaignMenu from "./CampaignMenu";
import { Module, Modules } from "../modules";
import BinderObject from "../objects/BinderObject";

enum Tab {
  Campaign = "Campaign",
  Binder = "Binder",
  View = "View",
  Options = "Options",
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
  const { preferences, setPreferences } = usePreferencesStore();
  const { getPlayerEntities } = useEntities();
  const players = getPlayerEntities();
  const { currentCampaign } = useCampaigns();

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
      largeFont: !preferences.largeFont,
    });
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: theme } = event.target;

    setPreferences({
      ...preferences,
      theme,
    });
  };

  const handleModuleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    module: Module
  ) => {
    const { checked } = event.target;
    const visibleModules = {
      ...preferences.visibleModules,
      [module]: checked,
    };

    setPreferences({
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

  const renderModuleCheckboxes = () => {
    return Object.values(Modules).map((module) => (
      <MenuInput
        key={module.id}
        label={module.label}
        checked={preferences.visibleModules[module.id]}
        type={"checkbox"}
        name="visibleModule"
        onChange={(ev): void => handleModuleChange(ev, module.id)}
      />
    ));
  };

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
              currentTab === Tab.Binder ? styles.active : ""
            }`}
            onClick={() => handleTabClick(Tab.Binder)}
          >
            Binder
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
              <h2 className={styles.tabHeader}>
                {currentCampaign ? currentCampaign.name : "Campaign Name"}
              </h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabSubtext}>
                {currentCampaign
                  ? currentCampaign.desc
                  : "A Campaign description provided by the user when they make a new campaign"}
              </div>
              <br />
              <div className={styles.menuRowContainer}>
                <Button
                  onClick={() =>
                    preferences.currentCampaignId &&
                    handleDelete("campaign", preferences.currentCampaignId)
                  }
                >
                  Delete Campaign
                </Button>
                <Button onClick={() => handleCampaign("Load")}>
                  Load Campaign
                </Button>
                <Button onClick={() => handleCampaign("New")}>
                  Start New Campaign
                </Button>
              </div>
              <br />
              <h2 className={styles.tabHeader}>Players</h2>
              <hr className={styles.tabHorizontalLine} />

              <div className={styles.menuScrollContainer}>
                {players.map((player) => (
                  <div key={player.id} className={styles.menuRowContainer}>
                    <div className={styles.menuEndContainer}>
                      <Button>
                        <FontAwesomeIcon icon="pencil" />
                      </Button>

                      <div className={styles.menuTitle}>{player.name}</div>
                    </div>
                    <div
                      className={styles.deleteButton}
                      onClick={() => handleDelete("entity", player.id)}
                    >
                      <FontAwesomeIcon icon="close" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentTab === Tab.Binder && (
            /*Campaign tab content, here we will do stuff like show the name of
              your campaign, start a new campaign, or load a campaign*/
            <div className={styles.tabContent}>
              <BinderObject />
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
                  name="Tutorial Tips"
                  onChange={handleTutorialBoxChange}
                />
              </div>
              <h2 className={styles.tabHeader}>Visible Modules</h2>
              <hr className={styles.tabHorizontalLine} />
              <div className={styles.tabCheckboxContainer}>
                {renderModuleCheckboxes()}
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
                  label="High Contrast Parchment"
                  checked={preferences.theme === "highContrast"}
                  type={"radio"}
                  name="theme"
                  value="highContrast"
                  onChange={handleThemeChange}
                />
                <MenuInput
                  label="High Contrast Dark"
                  checked={preferences.theme === "highContrastDark"}
                  type={"radio"}
                  name="theme"
                  value="highContrastDark"
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
