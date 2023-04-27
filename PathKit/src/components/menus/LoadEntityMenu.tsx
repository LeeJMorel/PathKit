import React, { useState } from "react";
import styles from "./Menu.module.scss";
import MenuButton from "../buttons/Button";
import { useCampaigns, usePreferencesStore } from "../../hooks";
import BinderObject from "../objects/BinderObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICampaignMenuProps {
  onClose: () => void;
}

const CampaignMenu: React.FC<ICampaignMenuProps> = ({ onClose }) => {
  const { campaigns, loadCampaign } = useCampaigns();

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
        <h2>Select</h2>
        <BinderObject load={true} />
        <div className={styles.menuRowContainer}>
          <MenuButton disabled={!selectedCampaign} onClick={handleLoadClick}>
            Load
          </MenuButton>
          <MenuButton onClick={handleClose}>Cancel</MenuButton>
        </div>
      </>
    );
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.header}>
          {renderLoadContent()}
          <div className={styles.close} onClick={handleClose}>
            <FontAwesomeIcon icon="close" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMenu;
