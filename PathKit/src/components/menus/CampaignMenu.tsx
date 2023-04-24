import React, { useState } from "react";
import styles from "./Menu.module.scss";
import MenuButton from "../buttons/Button";
import NewCampaignForm from "../forms/NewCampaignForm";
import { useCampaigns, usePreferencesStore } from "../../hooks";

interface ICampaignMenuProps {
  type: "Load" | "New";
  onClose: () => void;
}

const CampaignMenu: React.FC<ICampaignMenuProps> = ({ type, onClose }) => {
  const {
    campaigns,
    currentCampaignId,
    addCampaign,
    deleteCampaign,
    loadCampaign,
    unloadCampaign,
  } = useCampaigns();

  const [selectedCampaign, setSelectedCampaign] = useState<string>("");

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };

  const handleLoadClick = () => {
    loadCampaign(selectedCampaign);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const renderLoadContent = () => {
    return (
      <>
        <h2>Select Campaign</h2>
        <div className={styles.content}>
          {campaigns.map((campaign) => (
            <div key={campaign.id} className={styles.menuRowContainer}>
              <div
                className={`${styles.menuTitle} ${
                  selectedCampaign === campaign.name
                    ? styles.selectedCampaign
                    : ""
                }`}
                onClick={() => handleCampaignSelect(campaign.id)}
              >
                {campaign.name}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.menuRowContainer}>
          <MenuButton disabled={!selectedCampaign} onClick={handleLoadClick}>
            Load
          </MenuButton>
          <MenuButton onClick={handleClose}>Cancel</MenuButton>
        </div>
      </>
    );
  };

  const renderNewContent = () => {
    return (
      <>
        <h2>Start a new campaign</h2>
        <NewCampaignForm />
      </>
    );
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        {type === "Load" ? renderLoadContent() : renderNewContent()}
        <div className={styles.close} onClick={handleClose}>
          X
        </div>
      </div>
    </div>
  );
};

export default CampaignMenu;
