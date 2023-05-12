import { useState } from "react";
import styles from "./Form.module.scss";
import { useCampaigns } from "../../hooks";
import { Button } from "../buttons";

interface INewCampaignFormProps {
  onSubmit?: () => void;
}
const NewCampaignForm = ({ onSubmit }: INewCampaignFormProps) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [formError, setFormError] = useState("");

  const { addCampaign } = useCampaigns();

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
    addCampaign({
      name,
      desc,
    });
    if (typeof onSubmit === "function") {
      onSubmit();
    }
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
      <Button type="submit" className={styles.formButton}>
        Create Campaign
      </Button>
    </form>
  );
};

export default NewCampaignForm;
