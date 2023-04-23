import React, { useState } from "react";
import styles from "./Menu.module.scss";
import MenuButton from "./MenuButton";
import NewCampaignForm from "../forms/NewCampaignForm";
//import { useCampaignStore } from "./CampaignStore";

interface ICampaignMenuProps {
  type: "Load" | "New";
  onClose: () => void;
}

const CampaignMenu: React.FC<ICampaignMenuProps> = ({ type, onClose }) => {
  //const campaignStore = useCampaignStore();
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");

  const handleCampaignSelect = (campaignName: string) => {
    setSelectedCampaign(campaignName);
  };

  const handleLoadClick = () => {
    //campaignStore.loadCampaign(selectedCampaign);
    handleClose();
  };

  const handleNewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = form.title.valueOf;
    const description = form.description.value;
    //campaignStore.startNewCampaign(title, description);
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
          {/* {campaignStore.campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className={`${styles.campaignItem} ${
                selectedCampaign === campaign.name ? styles.selectedCampaign : ""
              }`}
              onClick={() => handleCampaignSelect(campaign.name)}
            >
              {campaign.name}
            </div>
          ))} */}
        </div>
        <div className={styles.menuRowContainer}>
          <MenuButton
            label="Load"
            disabled={!selectedCampaign}
            onClick={handleClose}
          ></MenuButton>
          <MenuButton label="Cancel" onClick={handleClose}></MenuButton>
        </div>
      </>
    );
  };

  const renderNewContent = () => {
    return (
      <>
        <h2>Start a new campaign</h2>
        <NewCampaignForm
          onFormSubmit={function (name: string, description: string): void {
            throw new Error("Function not implemented.");
          }}
        ></NewCampaignForm>
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
