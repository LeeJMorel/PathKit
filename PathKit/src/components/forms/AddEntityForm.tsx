import { useEffect, useState } from "react";
import monster from "../../assets/monster.png";
import player from "../../assets/knight.png";
import defaultImage from "../../assets/fighter.png";
import store from "../../assets/store.png";
import styles from "./Form.module.scss";
import { IEntity, EntityType } from "../../api/model";
import { useEntities } from "../../hooks";
import { Button } from "../buttons";

interface Props {
  type: EntityType;
  entityData?: IEntity;
  onAddEntity: (entity: IEntity) => void;
}

const AddEntityForm: React.FC<Props> = ({
  type = EntityType.none,
  entityData,
  onAddEntity,
}) => {
  const { addEntity } = useEntities();
  const [entity, setEntity] = useState<Omit<IEntity, "id">>({
    image: defaultImage,
    name: "",
    stats: {},
    hp: [0, 0],
    entityType: type,
    ...entityData,
  });

  const handleAddEntity = () => {
    const newEntity = addEntity(entity);
    onAddEntity(newEntity);
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

  const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEntity({
      ...entity,
      hp: [Number(value), Number(value)],
    });
  };

  let statsField;
  let hpField;

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
            defaultValue={entity.stats?.toString()}
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
            defaultValue={entity.hp ? entity.hp[1] : ""}
            onChange={handleHPChange}
            className={styles.formInput}
          />
        </div>
      </>
    );
  }

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
          defaultValue={entity.image}
        >
          <option value={defaultImage}>Fighter</option>
          <option value={monster}>Monster</option>
          <option value={player}>Player</option>
          <option value={store}>Store</option>
        </select>
      </div>
      <div className={styles.formRow}>
        <label htmlFor="name" className={styles.formLabel}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          defaultValue={entity.name}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </div>
      {statsField}
      {hpField}
      <Button onClick={handleAddEntity}>Save {type}</Button>
    </form>
  );
};

export default AddEntityForm;
