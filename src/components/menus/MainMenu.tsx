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
} from "../../hooks";
import DeleteMenu from "./DeleteMenu";
import CampaignMenu from "./CampaignMenu";
import { Module, Modules } from "../modules";
import BinderObject from "../objects/BinderObject";
import { IEntity } from "../../api/model";
import AddEntityForm from "../forms/AddEntityForm";
import Tabs from "../tabs/tab";
import { useNavigate } from "react-router-dom";

interface IMainMenuProps {
  onClose: () => void;
}
const MainMenu: React.FC<IMainMenuProps> = ({ onClose }: IMainMenuProps) => {
  const paths = useStore((store) => store.paths);
  const { preferences, setPreferences } = usePreferencesStore();
  const { getPlayerEntities, updateOrAddEntity: updateEntity } = useEntities();
  const players = getPlayerEntities();
  const { currentCampaign, currentCampaignId } = useCampaigns();

  //placeholder until store can delete
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"entity" | "path" | "campaign">(
    "entity"
  );
  const [deleteId, setDeleteId] = useState<number>();

  const [showCampaignMenu, setShowCampaignMenu] = useState<boolean>(false);
  const [campaignType, setCampaignType] = useState<"Load" | "New">("Load");

  const handleLargeFontChange = () => {
    setPreferences({
      largeFont: !preferences.largeFont,
    });
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences({
      [key]: value,
    });
  };

  const navigate = useNavigate();

  const handleViewLicense = () => {
    navigate(`/license`);
    onClose();
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

  const handleDelete = (type: "entity" | "path" | "campaign", id: number) => {
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

  const handleClose = () => {
    onClose();
  };

  //We don't want this player to be active this session
  const handleAbsent = (
    event: React.ChangeEvent<HTMLInputElement>,
    playerId: number
  ) => {
    const { checked } = event.target;

    setPreferences({
      absentPlayers: checked
        ? preferences.absentPlayers.filter((id) => id !== playerId)
        : [...preferences.absentPlayers, playerId],
    });
  };

  const renderModuleCheckboxes = () => {
    return Object.values(Modules).map((module) => (
      <MenuInput
        key={module.id}
        title={
          module.label +
          (preferences.visibleModules[module.id] ? " (visible)" : "")
        }
        label={module.label}
        checked={preferences.visibleModules[module.id]}
        type={"checkbox"}
        name="visibleModule"
        onChange={(ev): void => handleModuleChange(ev, module.id)}
      />
    ));
  };

  const renderCustomModuleCheckboxes = () => <p>Custom modules coming soon!</p>;

  const tabs = [
    {
      id: "campaign",
      title: "Campaign",
      content: (
        <div className={styles.tabContent}>
          <h2
            className={styles.tabHeader}
            title={currentCampaign ? currentCampaign.name : ""}
          >
            {currentCampaign ? currentCampaign.name : "Campaign Name"}
          </h2>
          <hr className={styles.tabHorizontalLine} />
          <div
            className={styles.tabSubtext}
            title={currentCampaign ? currentCampaign.desc : ""}
          >
            {currentCampaign
              ? currentCampaign.desc
              : "A Campaign description provided by the user when they make a new campaign"}
          </div>
          <br />
          <div className={styles.menuRowContainer}>
            <Button
              title={"Delete Campaign"}
              className={styles.buttonMargin}
              onClick={() =>
                currentCampaignId && handleDelete("campaign", currentCampaignId)
              }
            >
              Delete Campaign
            </Button>
            <Button
              title={"Load Campaign"}
              className={styles.buttonMargin}
              onClick={() => handleCampaign("Load")}
            >
              Load Campaign
            </Button>
            <Button
              title={"Start New Campaign"}
              className={styles.buttonMargin}
              onClick={() => handleCampaign("New")}
            >
              Start New Campaign
            </Button>
          </div>
          <div className={styles.menuRowContainer}>
            <h3 title={"Players"} className={styles.tabHeader}>
              Players
            </h3>
            <h4 title={"Indicate if a player is present"}>is Present</h4>
          </div>
          <hr className={styles.tabHorizontalLine} />

          <div className={styles.menuScrollContainer}>
            {players.map((player) => (
              <div key={player.id} className={styles.menuRowContainer}>
                <div className={styles.menuEndContainer}>
                  <div className={styles.menuTitle} title={player.name}>
                    {player.name}
                  </div>
                </div>
                <div
                  title={`${player.name}: ${
                    !preferences.absentPlayers.includes(player.id)
                      ? "is Present"
                      : "is Not Present"
                  }`}
                >
                  <MenuInput
                    key={player.id}
                    checked={!preferences.absentPlayers.includes(player.id)}
                    type="checkbox"
                    name="isActive"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAbsent(event, player.id)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "binder",
      title: "Binder",
      content: (
        <div className={styles.tabContent}>
          <BinderObject />
        </div>
      ),
    },
    {
      id: "view",
      title: "View",
      content: (
        <div className={styles.tabContent}>
          <div className={styles.menuRowContainer}>
            <h3 className={styles.tabHeader} title={"Visible Modules"}>
              Visible Modules
            </h3>
          </div>
          <hr className={styles.tabHorizontalLine} />
          <div className={styles.menuRowContainer}>
            <div className={styles.menuColumnContainer}>
              <h4>Built-in</h4>
              {renderModuleCheckboxes()}
            </div>
            <div className={styles.menuColumnContainer}>
              <h4>Custom</h4>
              {renderCustomModuleCheckboxes()}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "options",
      title: "Settings",
      content: (
        <div className={styles.tabContent}>
          <h3 className={styles.tabHeader}>Options</h3>
          <hr className={styles.tabHorizontalLine} />
          <div className={styles.menuRowContainer}>
            <div className={styles.menuColumnContainer}>
              <MenuInput
                label="Enable fancy editor"
                checked={preferences.enableFancyEditor}
                type={"checkbox"}
                name="enableFancyEditor"
                onChange={() =>
                  handlePreferenceChange(
                    "enableFancyEditor",
                    !preferences.enableFancyEditor
                  )
                }
              />
            </div>
          </div>
          <h3 className={styles.tabHeader}>Accessibility</h3>
          <hr className={styles.tabHorizontalLine} />
          <div className={styles.menuRowContainer}>
            <div className={styles.menuColumnContainer}>
              <MenuInput
                label="Large Font"
                title={"Large Font"}
                checked={preferences.largeFont}
                type={"checkbox"}
                name="largeFont"
                value="Large Font"
                onChange={() =>
                  handlePreferenceChange("largeFont", !preferences.largeFont)
                }
              />
            </div>
          </div>
          <h3 className={styles.tabHeader}>Color Themes</h3>
          <hr className={styles.tabHorizontalLine} />
          <div className={styles.menuRowContainer}>
            <div className={styles.menuColumnContainer}>
              <MenuInput
                label="Parchment (Light)"
                title={"Parchment Color Theme"}
                checked={preferences.theme === "parchment"}
                type={"radio"}
                name="theme"
                value="parchment"
                onChange={handleThemeChange}
              />
              <MenuInput
                label="Dark"
                title={"Dark Color Theme"}
                checked={preferences.theme === "dark"}
                type={"radio"}
                name="theme"
                value="dark"
                onChange={handleThemeChange}
              />
            </div>
            <div className={styles.menuColumnContainer}>
              <MenuInput
                label="High Contrast Parchment"
                title={"High Contrast Theme: Parchment"}
                checked={preferences.theme === "highContrast"}
                type={"radio"}
                name="theme"
                value="highContrast"
                onChange={handleThemeChange}
              />
              <MenuInput
                label="High Contrast Dark"
                title={"High Contrast Theme: Dark"}
                checked={preferences.theme === "highContrastDark"}
                type={"radio"}
                name="theme"
                value="highContrastDark"
                onChange={handleThemeChange}
              />
            </div>
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
            to provide suggestions on improving the software's accessibility.
          </div>
        </div>
      ),
    },
    {
      id: "about",
      title: "About",
      content: (
        <div className={styles.tabContent}>
          <div className={styles.tabSubtext}>
            Wizards of the Coast's OGL is what makes Pathfinder2e and PathKit
            possible, to read more click the button below.
          </div>
          <Button onClick={handleViewLicense}>View Open Game License</Button>
          <div className={styles.tabSubtext}>
            Default images provided by artists on Flaticon.
          </div>
          <Button
            onClick={() =>
              window.open("https://www.flaticon.com/free-icons/risk")
            }
            title="risk icons"
          >
            Icons created by Uniconlabs - Flaticon
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu} style={{ height: "480px" }}>
        <Tabs tabs={tabs} onClose={handleClose} />
        {showDeleteMenu && deleteId && (
          <DeleteMenu
            type={deleteType}
            id={deleteId}
            onClose={handleDeleteClose}
          />
        )}

        {showCampaignMenu && (
          <CampaignMenu type={campaignType} onClose={handleCampaignClose} />
        )}
      </div>
    </div>
  );
};

export default MainMenu;
