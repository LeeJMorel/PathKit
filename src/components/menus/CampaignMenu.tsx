import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Menu.module.scss";
import Button from "../buttons/Button";
import NewCampaignForm from "../forms/NewCampaignForm";
import { useCampaigns } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICampaignMenuProps {
  type: "Load" | "New";
  onClose: () => void;
}

const CampaignMenu: React.FC<ICampaignMenuProps> = ({ type, onClose }) => {
  const { campaigns, loadCampaign, refreshCampaigns } = useCampaigns();

  useEffect(() => {
    refreshCampaigns();
  }, []);

  const [selectedCampaign, setSelectedCampaign] = useState<number>();

  const handleCampaignSelect = (campaignId: number) => {
    setSelectedCampaign(campaignId);
  };

  const handleLoadClick = () => {
    if (selectedCampaign) {
      loadCampaign(selectedCampaign);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const renderHeaderTitle = () => {
    if (type === "Load") {
      return (
        <>
          <h2>Select Campaign</h2>
        </>
      );
    } else {
      return (
        <>
          <h2>Start a new campaign</h2>
        </>
      );
    }
  };

  const renderLoadContent = () => {
    return (
      <>
        <div className={styles.content}>
          {campaigns.map((campaign) => (
            <div key={campaign.id} className={styles.menuRowContainer}>
              <div
                className={classNames(
                  styles.campaignName,
                  selectedCampaign === campaign.id && styles.selectedCampaign
                )}
                onClick={() => handleCampaignSelect(campaign.id)}
              >
                {campaign.name}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.menuRowContainer}>
          <Button disabled={!selectedCampaign} type="submit" variant="primary" onClick={handleLoadClick}>
            Load
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>Cancel</Button>
        </div>
      </>
    );
  };

  const renderNewContent = () => {
    return (
      <>
        <NewCampaignForm onSubmit={handleClose} />
      </>
    );
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.header}>
          {renderHeaderTitle()}
          <div className={styles.close} onClick={handleClose}>
            <FontAwesomeIcon icon="close" />
          </div>
        </div>
        {type === "Load" ? renderLoadContent() : renderNewContent()}
      </div>
    </div>
  );
};

export default CampaignMenu;
