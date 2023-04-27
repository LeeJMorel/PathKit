import { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { useEntities, usePlans, usePreferencesStore } from "../../hooks";
import { IPlan } from "src/api/model";

const InitiativeForm = () => {
  const { preferences, setPreferences } = usePreferencesStore();

  const [initiative, setInitiative] = useState("");
  const handleInitiativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitiative(e.target.value);
  };

  //generate menu based on selected plan
  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(undefined);
  useEffect(
    () => setCurrentPlan(getPlanById(preferences.selectedPlan || undefined)),
    [preferences.selectedPlan, getPlanById]
  );
  const planCards = currentPlan?.entities.map((entity) => (
    <div key={entity.id} className={styles.formRow}>
      <label htmlFor="name" className={styles.formLabel}>
        {entity.name}:
      </label>
      <input
        type="number"
        name="name"
        value={initiative}
        onChange={handleInitiativeChange}
        className={styles.formSmall}
      />
    </div>
  ));

  //get all the player entities, they should always be visible
  const { getPlayerEntities } = useEntities();
  const playerEntities = getPlayerEntities();
  const playerCards = playerEntities.map((entity) => (
    <div key={entity.id} className={styles.formRow}>
      <label htmlFor="name" className={styles.formLabel}>
        {entity.name}:
      </label>
      <input
        type="number"
        name="name"
        value={initiative}
        onChange={handleInitiativeChange}
        className={styles.formSmall}
      />
    </div>
  ));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {planCards}
      {playerCards}
      <br />
      <button type="submit" className={styles.formButton}>
        Start Encounter
      </button>
    </form>
  );
};

export default InitiativeForm;
