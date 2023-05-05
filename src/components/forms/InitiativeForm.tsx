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
    entityId: string | number
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
  const {
    getEntitiesById,
    getPlayerEntities,
    updateOrAddEntity: updateEntity,
  } = useEntities();
  const playerEntities = getPlayerEntities();
  const planEntities = getEntitiesById(currentPlan?.planEntities);
  const formFields = [...planEntities, ...playerEntities].map((entity) => (
    <div key={entity.entityId} className={styles.formRow}>
      <label
        htmlFor={`${entity.entityId}-initiativeForm`}
        className={styles.formLabel}
      >
        {entity.entityName}:
      </label>
      <input
        type="number"
        id={`${entity.entityId}-initiativeForm`}
        name={entity.entityId.toString()}
        value={entityInitiatives[entity.entityId] ?? ""}
        onChange={(e) => handleInitiativeChange(e, entity.entityId)}
        className={styles.formSmall}
      />
    </div>
  ));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission behavior

    // Check if the number of initiative values is less than the total number of entities
    if (
      Object.keys(entityInitiatives).length <
      getEntitiesById(currentPlan?.planEntities).length +
        getPlayerEntities().length
    ) {
      alert("Please enter a value for each entity's initiative.");
      return;
    }

    // Check if all initiative values are non-negative numbers
    const allValid = Object.values(entityInitiatives).every(
      (value) => !isNaN(value) && value >= 0
    );

    if (allValid) {
      // Update the initiatives for each entity
      Object.keys(entityInitiatives).forEach((entityId) => {
        updateEntity({
          entityId: entityId,
          entityInitiative: entityInitiatives[entityId],
        });
      });
      onClose();
    } else {
      alert("Please enter a non-negative number for each initiative value.");
    }
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
