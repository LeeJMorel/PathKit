import { useState } from "react";
import styles from "./Form.module.scss";

interface Props {
  onFormSubmit: (name: string, description: string) => void;
}

const NewCampaignForm: React.FC<Props> = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(name, description);
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
      </div>
      <div className={styles.formRow}>
        <label htmlFor="description" className={styles.formLabel}>
          Description:
        </label>
        <textarea
          name="description"
          value={description}
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
