import React, { useState } from "react";
import styles from "./Menu.module.scss";
import Button from "../buttons/Button";
import CampaignMenu from "./CampaignMenu";

export const WelcomeMenu = () => {
  const [showCampaignMenu, setShowCampaignMenu] = useState<boolean>(false);
  const [campaignType, setCampaignType] = useState<"Load" | "New">("Load");

  const handleCampaignClose = () => {
    setShowCampaignMenu(false);
  };

  const handleCampaign = (type: "Load" | "New") => {
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
            existing one.
          </div>
          <br />
          <div className={styles.menuRowContainer}>
            <Button onClick={() => handleCampaign("New")}>
              Start New Campaign
            </Button>
            <Button onClick={() => handleCampaign("Load")}>
              Load Existing Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
