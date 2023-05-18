import React, { useState } from "react";
import styles from "./Menu.module.scss";
import Button from "../buttons/Button";
import CampaignMenu from "./CampaignMenu";

export const WelcomeMenu = () => {
  const [showCampaignMenu, setShowCampaignMenu] = useState<boolean>(false);
  const [campaignType, setCampaignType] = useState<"Load" | "New" | "Import">(
    "Load"
  );

  const handleCampaignClose = () => {
    setShowCampaignMenu(false);
  };

  const handleCampaign = (type: "Load" | "New" | "Import") => {
    setShowCampaignMenu(true);
    setCampaignType(type);
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.tabContent}>
          {showCampaignMenu && (
            <CampaignMenu type={campaignType} onClose={handleCampaignClose} />
          )}
          <h2>Welcome to PathKit!</h2>
          <hr className={styles.tabHorizontalLine} />
          <div className={styles.tabSubtext}>
            To get started either select Start New Campaign, or Load an already
            existing one. If you have an exported
          </div>
          <br />
          <div className={styles.menuRowContainer}>
            <Button
              className={styles.buttonMargin}
              onClick={() => handleCampaign("New")}
              variant="primary"
            >
              Start New Campaign
            </Button>
            <Button
              className={styles.buttonMargin}
              onClick={() => handleCampaign("Load")}
            >
              Load Existing Campaign
            </Button>
            <Button
              className={styles.buttonMargin}
              onClick={() => handleCampaign("Import")}
            >
              Import Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
