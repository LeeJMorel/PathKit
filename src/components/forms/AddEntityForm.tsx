import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import monster from "../../assets/monster.png";
import player from "../../assets/knight.png";
import defaultImage from "../../assets/fighter.png";
import store from "../../assets/store.png";
import styles from "./Form.module.scss";
import { IEntity, EntityType, PartialEntity } from "../../api/model";
import { useEntities } from "../../hooks";
import { Button } from "../buttons";
import classNames from "classnames";

export interface IEntityFormProps {
  type?: EntityType;
  entityData?: PartialEntity;
  onAddEntity: (entity: PartialEntity) => void;
  onClose?: () => void;
}

const AddEntityForm: React.FC<IEntityFormProps> = ({
  type: typeProp = EntityType.none,
  entityData: entityDataProp,
  onAddEntity,
  onClose,
}) => {
  const { entityId } = useParams();
  const [searchParams] = useSearchParams();
  const { updateOrAddEntity, getEntityById } = useEntities();
  const type = searchParams.get("type") || typeProp;
  const entityData = useMemo(
    () => entityDataProp || getEntityById(entityId),
    [entityId, entityDataProp]
  );
  const [entity, setEntity] = useState<PartialEntity>({
    image: defaultImage,
    name: "",
    // stats: {},
    // hp: [0, 0],
    type: type as EntityType,
    ...entityData,
  });

  useEffect(() => {
    setEntity((prev) => ({
      ...prev,
      ...entityData,
    }));
  }, [entityData]);

  const handleClose = () => {
    onClose?.();
  };

  const handleAddEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntity = await updateOrAddEntity(entity);
    if (newEntity) {
      onAddEntity(newEntity);
    }
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

  // const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setEntity({
  //     ...entity,
  //     hp: [Number(value), Number(value)],
  //   });
  // };

  // let statsField;
  // let hpField;

  if (entity.type === "Monster" || entity.type === "Player") {
    // statsField = (
    //   <>
    //     <div className={styles.formRow}>
    //       <label htmlFor="stats" className={styles.formLabel}>
    //         Stats:
    //       </label>
    //       <input
    //         type="text"
    //         name="stats"
    //         value={entity.stats?.toString()}
    //         onChange={handleInputChange}
    //         className={styles.formInput}
    //       />
    //     </div>
    //   </>
    // );
    //   hpField = (
    //     <>
    //       <div className={styles.formRow}>
    //         <label htmlFor="hp" className={styles.formLabel}>
    //           HP:
    //         </label>
    //         <input
    //           type="text"
    //           name="hp"
    //           min={0}
    //           value={entity.hp ? entity.hp[1] : ""}
    //           onChange={handleHPChange}
    //           className={styles.formInput}
    //         />
    //       </div>
    //     </>
    //   );
  }

  return (
    <form className={styles.formContainer} onSubmit={handleAddEntity}>
      <div className={styles.formRow}>
        <label htmlFor="image" className={styles.formLabel}>
          Image:
        </label>
        <select
          name="image"
          onChange={handleInputChange}
          className={styles.formSelect}
          value={entity.image}
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
          value={entity.name}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </div>
      {/* {statsField}
      {hpField} */}
      <div className={classNames(styles.formRow, styles.actionRow)}>
        <Button type="submit" variant="primary">
          Save {entity.type}
        </Button>
        {onClose && <Button onClick={handleClose}>Cancel</Button>}
      </div>
    </form>
  );
};

export default AddEntityForm;
