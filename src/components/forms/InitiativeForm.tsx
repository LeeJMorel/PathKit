import { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { useEntities, usePaths, usePreferencesStore } from "../../hooks";
import { IPath } from "src/api/model";
import { Button } from "../buttons";

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

  //generate menu based on selected path
  const { getPathById } = usePaths();
  const [currentPath, setCurrentPath] = useState<IPath | undefined>(undefined);
  useEffect(
    () => setCurrentPath(getPathById(preferences.selectedPath || undefined)),
    [preferences.selectedPath, getPathById]
  );

  //get all the player entities, they should always be visible
  const { getEntitiesById, getPlayerEntities, updateEntityById } =
    useEntities();
  const playerEntities = getPlayerEntities();
  const pathEntities = getEntitiesById(currentPath?.entities);
  const formFields = (
    <table>
      <tbody>
        {pathEntities.map((entity) => (
          <tr key={entity.id}>
            <td>
              <label htmlFor={`${entity.id}-initiativeForm`}>
                {entity.name}:
              </label>
            </td>
            <td>
              <input
                type="number"
                id={`${entity.id}-initiativeForm`}
                name={entity.id.toString()}
                value={entityInitiatives[entity.id] ?? ""}
                onChange={(e) => handleInitiativeChange(e, entity.id)}
                className={styles.formSmall}
              />
            </td>
          </tr>
        ))}
        {playerEntities.map((entity) => (
          <tr key={entity.id}>
            <td>
              <label htmlFor={`${entity.id}-initiativeForm`}>
                {entity.name}:
              </label>
            </td>
            <td>
              <input
                type="number"
                id={`${entity.id}-initiativeForm`}
                name={entity.id.toString()}
                value={entityInitiatives[entity.id] ?? ""}
                onChange={(e) => handleInitiativeChange(e, entity.id)}
                className={styles.formSmall}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission behavior

    // Check if the number of initiative values is less than the total number of entities
    if (
      Object.keys(entityInitiatives).length <
      getEntitiesById(currentPath?.entities).length + getPlayerEntities().length
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
        updateEntityById({
          id: entityId,
          initiative: entityInitiatives[entityId],
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
      <Button type="submit" className={styles.formButton}>
        Start Encounter
      </Button>
    </form>
  );
};

export default InitiativeForm;
