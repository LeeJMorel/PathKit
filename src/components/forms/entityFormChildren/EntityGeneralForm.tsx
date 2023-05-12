import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const EntityGeneralForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
  onImageUpload,
}) => {
  return (
    <>
      <label className={styles.formLabel}>Image:</label>
      <div className={styles.formRow}>
        <Field name="image" type="file" className={styles.formInput} />
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>Name:</p>
        <Field name="name" className={styles.formInput} />
        <p className={styles.formLabel}>Level:</p>
        <Field name="build.level" type="number" className={styles.formSmall} />
        <p className={styles.formLabel}>Size:</p>
        <Field name="build.size" type="number" className={styles.formSmall} />
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>Traits:</p>
        <Field name="build.level" className={styles.formInput} />
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>Perception:</p>
        <Field
          name="build.proficiency.perception"
          type="number"
          className={styles.formInput}
        />
        <p className={styles.formLabel}>Languages:</p>
        <Field name="build.languages" className={styles.formInput} />
        <p className={styles.formLabel}>Skills:</p>
        <Field name="build.skill" className={styles.formInput} />
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>STR</p>
        <p className={styles.formLabel}>DEX</p>
        <p className={styles.formLabel}>CON</p>
        <p className={styles.formLabel}>INT</p>
        <p className={styles.formLabel}>WIS</p>
        <p className={styles.formLabel}>CHA</p>
      </div>
      <div className={styles.formRow}>
        <Field
          name="build.ability.str"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.ability.dex"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.ability.con"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.ability.int"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.ability.wis"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.ability.cha"
          type="number"
          className={styles.formSmall}
        />
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>AC</p>
        <p className={styles.formLabel}>Will</p>
        <p className={styles.formLabel}>Reflex</p>
        <p className={styles.formLabel}>Fortitude</p>
        <p className={styles.formLabel}>DC</p>
      </div>
      <div className={styles.formRow}>
        <Field
          name="build.acTotal"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.proficiency.will"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.proficiency.reflex"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.proficiency.fortitude"
          type="number"
          className={styles.formSmall}
        />
        <Field
          name="build.proficiency.classDC"
          type="number"
          className={styles.formSmall}
        />
      </div>
      <div className={styles.formRow}>
        {/*multiple hp's may exist in one entity is it is a group. This will be
          based on monster quantity.*/}
        <div className={styles.formGroup}>
          <p className={styles.formLabel}>HP:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
          /
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>Conditions:</p>
        <Field name="conditions" className={styles.formInput} />
        <p className={styles.formLabel}>Resistances:</p>
        <Field name="resistances" className={styles.formInput} />
        <p className={styles.formLabel}>Immunities:</p>
        <Field name="immunities" className={styles.formInput} />
      </div>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>Speed:</p>
        <Field
          name="build.attributes.speed"
          type="number"
          className={styles.formInput}
        />
        <p className={styles.formLabel}>Fly:</p>
        <Field
          name="build.attributes.fly"
          type="number"
          className={styles.formInput}
        />
        <p className={styles.formLabel}>Burrow:</p>
        <Field
          name="build.attributes.burrow"
          type="number"
          className={styles.formInput}
        />
        <p className={styles.formLabel}>Climb:</p>
        <Field
          name="build.attributes.climb"
          type="number"
          className={styles.formInput}
        />
        <p className={styles.formLabel}>Swim:</p>
        <Field
          name="build.attributes.swim"
          type="number"
          className={styles.formInput}
        />
      </div>
    </>
  );
};

export default EntityGeneralForm;
