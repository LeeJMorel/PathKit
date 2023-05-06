import { useState } from "react";
import styles from "./Form.module.scss";
import { useCampaigns } from "../../hooks";

const NewCampaignForm = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [formError, setFormError] = useState("");

  const {
    campaigns,
    currentCampaignId,
    addCampaign,
    deleteCampaign,
    loadCampaign,
    unloadCampaign,
  } = useCampaigns();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === "") {
      setFormError("Name cannot be empty.");
      return;
    }
    addCampaign({ campaignName: name, campaignDesc: desc });
    // window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formRow}>
        <label htmlFor="name" className={styles.formLabel}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className={styles.formInput}
        />
        {formError && <div className={styles.formError}>{formError}</div>}
      </div>
      <div className={styles.formRow}>
        <label htmlFor="description" className={styles.formLabel}>
          Description:
        </label>
        <textarea
          name="description"
          value={desc}
          onChange={handleDescriptionChange}
          maxLength={240}
          className={styles.formTextarea}
        />
      </div>
      <button type="submit" className={styles.formButton}>
        Create Campaign
      </button>
    </form>
  );
};

export default NewCampaignForm;
