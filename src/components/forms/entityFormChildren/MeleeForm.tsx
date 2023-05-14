import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const MeleeForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
  index: count,
}) => {
  return (
    <>
      <CollapsibleHeader title={`Melee ${count}`} toggle>
        <br />
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity.*/}
          <p className={styles.formLabel}>Action Number:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Name:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Attack:</p>
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
        <h4>Damage</h4>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple damage types*/}
          <p className={styles.formLabel}>Value:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
          d
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
          +
          <Field
            name="build.level"
            type="number"
            className={styles.formSmall}
          />
          <p className={styles.formLabel}>Type:</p>
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

export default MeleeForm;
