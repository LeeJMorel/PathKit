import { usePreferencesStore, useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { IEntity } from "../../api/model";

function EntitySheet() {
  const { preferences, setPreferences } = usePreferencesStore();
  const { getEntityById } = useEntities();
  const [entity, setEntity] = useState<IEntity>();

  useEffect(() => {
    if (preferences.selectedEntity) {
      const entity = getEntityById(preferences.selectedEntity);
      setEntity(entity);
    } else {
      setEntity(undefined);
    }
  }, [preferences.selectedEntity, getEntityById]);

  const handleCancelClick = () => {
    setPreferences({ selectedEntity: null });
  };

  return (
    <div className={styles.sheetsContainer}>
      {entity?.image && (
        <div className={styles.imageContainer}>
          <img src={entity.image} alt={entity.name} />
        </div>
      )}
      <div className={styles.header}>
        <h2>{entity?.name}</h2>
        <button onClick={handleCancelClick}>
          <FontAwesomeIcon icon="close" />
        </button>
      </div>
      <hr />
      <ul>
        {entity?.stats && (
          <li>
            Stats:
            <ul>
              {Object.entries(entity.stats).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </li>
        )}
        {entity?.hp && (
          <li>
            HP: {entity.hp[0]}/{entity.hp[1]}
            {entity.hp[2] && ` (+${entity.hp[2]} temp HP)`}
          </li>
        )}
        {entity?.equipment && <li>Equipment: {entity.equipment.join(", ")}</li>}
      </ul>
    </div>
  );
}

export default EntitySheet;
