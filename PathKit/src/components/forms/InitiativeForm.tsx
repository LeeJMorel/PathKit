import { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { useEntities, usePlans, usePreferencesStore } from "../../hooks";
import { IPlan } from "src/api/model";

export interface InitiativeMenuProps {
  onClose: () => void;
}

const InitiativeForm = ({ onClose }: InitiativeMenuProps) => {
  const { preferences, setPreferences } = usePreferencesStore();

  const [entityInitiatives, setEntityInitiatives] = useState<{
    [key: string]: number;
  }>({});

  const handleInitiativeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    entityId: string
  ) => {
    const newInitiative = parseInt(e.target.value, 10) || 0;
    setEntityInitiatives({ ...entityInitiatives, [entityId]: newInitiative });
  };

  //generate menu based on selected plan
  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(undefined);
  useEffect(
    () => setCurrentPlan(getPlanById(preferences.selectedPlan || undefined)),
    [preferences.selectedPlan, getPlanById]
  );

  //get all the player entities, they should always be visible
  const { getPlayerEntities, updateEntity } = useEntities();
  const playerEntities = getPlayerEntities();
  const formFields = [...(currentPlan?.entities ?? []), ...playerEntities].map(
    (entity) => (
      <div key={entity.id} className={styles.formRow}>
        <label
          htmlFor={`${entity.id}-initiativeForm`}
          className={styles.formLabel}
        >
          {entity.name}:
        </label>
        <input
          type="number"
          id={`${entity.id}-initiativeForm`}
          name={entity.id}
          value={entityInitiatives[entity.id] ?? ""}
          onChange={(e) => handleInitiativeChange(e, entity.id)}
          className={styles.formSmall}
        />
      </div>
    )
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission behavior
    // Update the initiatives for each entity
    Object.keys(entityInitiatives).forEach((entityId) => {
      updateEntity({ id: entityId, initiative: entityInitiatives[entityId] });
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {formFields}
      <br />
      <button type="submit" className={styles.formButton}>
        Start Encounter
      </button>
    </form>
  );
};

export default InitiativeForm;
