import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const AddSpellForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
  count,
}) => {
  return (
    <>
      <CollapsibleHeader title={`Spell ${count}`} toggle>
        <br />
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity.*/}
          <p className={styles.formLabel}>Name:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Spell Type:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Level:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple traits.*/}
          <p className={styles.formLabel}>Traits:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple traits.*/}
          <p className={styles.formLabel}>Traditions:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple damage types*/}
          <p className={styles.formLabel}>Range:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
          <p className={styles.formLabel}>Target:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
          <p className={styles.formLabel}>Area:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple traits.*/}
          <p className={styles.formLabel}>Saving Throw:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Duration:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <h4>Cast</h4>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple traits.*/}
          <p className={styles.formLabel}>Action Number:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Spell Components:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple damage types*/}
          <p className={styles.formLabel}>Effect:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <h4>Heightened</h4>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple damage types*/}
          <p className={styles.formLabel}>Level:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Effect:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
      </CollapsibleHeader>
    </>
  );
};

export default AddSpellForm;
