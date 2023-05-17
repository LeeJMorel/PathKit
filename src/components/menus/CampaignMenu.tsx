import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Menu.module.scss";
import Button from "../buttons/Button";
import NewCampaignForm from "../forms/NewCampaignForm";
import { useCampaigns } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImportCampaignForm from "../forms/ImportCampaignForm";

interface ICampaignMenuProps {
  type: "Load" | "New" | "Import";
  onClose: () => void;
}

const CampaignMenu: React.FC<ICampaignMenuProps> = ({ type, onClose }) => {
  const { campaigns, loadCampaign, refreshCampaigns } = useCampaigns();

  useEffect(() => {
    refreshCampaigns();
  }, []);

  const [selectedCampaign, setSelectedCampaign] = useState<string>();

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };

  const handleLoadClick = () => {
    if (selectedCampaign) {
      loadCampaign(selectedCampaign);
      handleClose();
    }
  };

  const handleImport = (campaignId: string) => {
    loadCampaign(campaignId);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const renderHeaderTitle = () => {
    let result;
    switch (type) {
      case "Import":
        result = <h2>Import Campaign</h2>;
        break;
      case "Load":
        result = <h2>Select Campaign</h2>;
        break;
      case "New":
      default:
        result = <h2>Start a new campaign</h2>;
        break;
    }
    return result;
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
          <Button
            disabled={!selectedCampaign}
            type="submit"
            variant="primary"
            onClick={handleLoadClick}
          >
            Load
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Cancel
          </Button>
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

  const renderImportContent = () => {
    return <ImportCampaignForm onSubmit={handleImport} />;
  };

  const renderContent = () => {
    let content = <></>;
    switch (type) {
      case "Import":
        content = renderImportContent();
        break;
      case "Load":
        content = renderLoadContent();
        break;
      case "New":
      default:
        content = renderNewContent();
        break;
    }
    return content;
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
        {renderContent()}
      </div>
    </div>
  );
};

export default CampaignMenu;
