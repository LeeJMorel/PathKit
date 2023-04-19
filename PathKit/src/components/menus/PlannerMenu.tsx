import React, { useState } from "react";
import styles from "./PlannerMenu.module.scss"; // Import your CSS/SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//placeholder until store exists
export interface IEntity {
  id: string;
  name: string;
  stats: {
    [key: string]: number;
  };
}

interface IPlannerMenuProps {
  onClose: () => void;
  onSave: (entities: IEntity[]) => void;
}

const PlannerMenu: React.FC<IPlannerMenuProps> = ({
  onClose,
  onSave,
}: IPlannerMenuProps) => {
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [newEntityName, setNewEntityName] = useState("");
  const [newEntityStats, setNewEntityStats] = useState<{
    [key: string]: number;
  }>({});

  const handleClose = () => {
    onClose();
  };

  const handleAddEntityClick = () => {
    setShowAddEntity(true);
  };

  const handleAddEntityCancel = () => {
    setShowAddEntity(false);
    setNewEntityName("");
    setNewEntityStats({});
  };

  const handleSaveClick = () => {
    onSave(entities);
    handleClose();
  };

  const handleEntityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewEntityName(event.target.value);
  };

  const handleEntityStatChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    statKey: string
  ) => {
    setNewEntityStats({
      ...newEntityStats,
      [statKey]: parseInt(event.target.value, 10),
    });
  };

  const handleAddEntitySubmit = () => {
    if (newEntityName.trim() !== "") {
      const newEntity: IEntity = {
        id: Date.now().toString(),
        name: newEntityName.trim(),
        stats: newEntityStats,
      };
      setEntities([...entities, newEntity]);
      handleAddEntityCancel();
    }
  };

  const renderAddEntity = () => {
    if (showAddEntity) {
      return (
        <div className={styles.addEntity}>
          <input
            type="text"
            value={newEntityName}
            onChange={handleEntityNameChange}
            placeholder="Entity Name"
          />
          <div className={styles.entityStats}>
            <h3>Add Custom Stats</h3>
            <div className={styles.entityStatsList}>
              <div className={styles.entityStat}>
                <label htmlFor="stat1">Stat 1:</label>
                <input
                  type="number"
                  id="stat1"
                  onChange={(event) => handleEntityStatChange(event, "stat1")}
                />
              </div>
              <div className={styles.entityStat}>
                <label htmlFor="stat2">Stat 2:</label>
                <input
                  type="number"
                  id="stat2"
                  onChange={(event) => handleEntityStatChange(event, "stat2")}
                />
              </div>
              <div className={styles.entityStat}>
                <label htmlFor="stat3">Stat 3:</label>
                <input
                  type="number"
                  id="stat3"
                  onChange={(event) => handleEntityStatChange(event, "stat3")}
                />
              </div>
            </div>
          </div>
          <div className={styles.addEntityButtons}>
            <button onClick={handleAddEntityCancel}>Cancel</button>
            <button onClick={handleAddEntitySubmit}>Add Entity</button>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <h2>Create Plan</h2>
        <div className={styles.close} onClick={handleClose}>
          <FontAwesomeIcon icon="close" />
        </div>
        <div className={styles.entityList}>
          {entities.map((entity) => (
            <div key={entity.id} className={styles.entity}>
              <div className={styles.entityTitle}>
                <div>{entity.name}</div>
                <div
                  onClick={() =>
                    setEntities(entities.filter((e) => e.id !== entity.id))
                  }
                >
                  &times;
                </div>
              </div>
            </div>
          ))}
          <div className={styles.entity}>
            {!showAddEntity && (
              <div
                className={styles.addEntityButton}
                onClick={handleAddEntityClick}
              >
                + Add Entity
              </div>
            )}
            {renderAddEntity()}
          </div>
        </div>
        <div className={styles.menuButtons}>
          <button className={styles.saveButton} onClick={handleSaveClick}>
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlannerMenu;
