import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import monster from "../../assets/monster.png";
import player from "../../assets/knight.png";
import defaultImage from "../../assets/fighter.png";
import styles from "./Form.module.scss";
import { IEntity, EntityType } from "../../api/model";

interface Props {
  type: EntityType;
  onAddEntity: (entity: IEntity) => void;
}

const AddEntityForm: React.FC<Props> = ({ type, onAddEntity }) => {
  const [entity, setEntity] = useState<IEntity>({
    id: uuid(),
    image: defaultImage,
    name: "",
    stats: {},
    hp: [0, 0],
    equipment: [],
    entityType: EntityType.none,
  });

  const handleAddEntity = () => {
    onAddEntity(entity);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setEntity({
      ...entity,
      [name]: value,
    });
  };

  let statsField;
  let hpField;
  let addButton;

  if (type === "Monster" || type === "Player") {
    statsField = (
      <>
        <div className={styles.formRow}>
          <label htmlFor="stats" className={styles.formLabel}>
            Stats:
          </label>
          <input
            type="text"
            name="stats"
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </div>
      </>
    );
    hpField = (
      <>
        <div className={styles.formRow}>
          <label htmlFor="hp" className={styles.formLabel}>
            HP:
          </label>
          <input
            type="text"
            name="hp"
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </div>
      </>
    );
  }

  if (type === "Player") {
    addButton = <p>Select save player when you are finished.</p>;
  } else {
    addButton = (
      <button
        type="button"
        onClick={handleAddEntity}
        className={styles.formButton}
      >
        Add Entity
      </button>
    );
  }

  useEffect(() => {
    if (type === "Player") {
      onAddEntity(entity);
    }
  }, [entity, type]);

  return (
    <form className={styles.formContainer}>
      <div className={styles.formRow}>
        <label htmlFor="image" className={styles.formLabel}>
          Image:
        </label>
        <select
          name="image"
          onChange={handleInputChange}
          className={styles.formSelect}
        >
          <option value={defaultImage}>Fighter</option>
          <option value={monster}>Monster</option>
          <option value={player}>Player</option>
        </select>
      </div>
      <div className={styles.formRow}>
        <label htmlFor="name" className={styles.formLabel}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </div>
      {statsField}
      {hpField}
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="equipment">
          Equipment:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="equipment"
          onChange={handleInputChange}
        />
      </div>
      {addButton}
    </form>
  );
};

export default AddEntityForm;
