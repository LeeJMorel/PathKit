import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuInput from "./MenuInput";
import Button from "../buttons/Button";
import {
  usePreferencesStore,
  useStore,
  useEntities,
  useCampaigns,
  PartialEntity,
} from "../../hooks";
import DeleteMenu from "./DeleteMenu";
import CampaignMenu from "./CampaignMenu";
import { Module, Modules } from "../modules";
import BinderObject from "../objects/BinderObject";
import { IEntity } from "../../api/model";
import AddEntityForm from "../forms/AddEntityForm";

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
  const [currentTab, setCurrentTab] = useState(Tab.Campaign);
  const { preferences, setPreferences } = usePreferencesStore();
  const { getPlayerEntities, updateEntity } = useEntities();
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
  const [showEntityForm, setShowEntityForm] = useState<IEntity | null>(null);

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

  //We don't want this player to be active this session
  const [isActive, setIsActive] = useState<boolean>(true);
  const handleActive = (
    event: React.ChangeEvent<HTMLInputElement>,
    playerId: IEntity["id"]
  ) => {
    const { checked } = event.target;
    setIsActive(checked);

    // Update the isActive property of the entity
    const partialEntity: PartialEntity = { id: playerId, isActive: checked };
    updateEntity(partialEntity);
  };

  const handleEditClose = () => {
    setShowEntityForm(null);
  };

  const handleEditEntity = (entity: IEntity) => {
    setShowEntityForm(entity);
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

  const renderEntityForm = () => {
    if (showEntityForm && showEntityForm.entityType) {
      return (
        <div className={styles.tabContent}>
          <h2>Edit {showEntityForm.entityType}</h2>
          <div className={styles.close} onClick={handleEditClose}>
            <FontAwesomeIcon icon="close" />
          </div>
          <AddEntityForm
            entityData={showEntityForm}
            type={showEntityForm.entityType}
            onAddEntity={(entity) => {
              updateEntity(entity);
              setShowEntityForm(null);
            }}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        {showEntityForm ? (
          renderEntityForm()
        ) : (
          <>
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
            <div className={styles.header}>
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
                  <div className={styles.menuRowContainer}>
                    <h2 className={styles.tabHeader}>Players</h2>
                    <h4>is Active</h4>
                  </div>
                  <hr className={styles.tabHorizontalLine} />

                  <div className={styles.menuScrollContainer}>
                    {players.map((player) => (
                      <div key={player.id} className={styles.menuRowContainer}>
                        <div className={styles.menuEndContainer}>
                          <div className={styles.menuTitle}>{player.name}</div>
                        </div>
                        <div className={styles.largeCheck}>
                          <MenuInput
                            checked={isActive}
                            type={"checkbox"}
                            name="isActive"
                            value="isActive"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => handleActive(event, player.id)}
                          />
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
                  <div className={styles.menuRowContainer}>
                    <h2 className={styles.tabHeader}>Visible Modules</h2>
                  </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MainMenu;
