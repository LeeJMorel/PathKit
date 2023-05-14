import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const FreeActionForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index: count,
  onRemove,
}) => {
  return (
    <>
      <CollapsibleHeader
        title={`Free Action ${count}`}
        toggle
        onRemove={onRemove}
      >
        <br />
        <div className={styles.formRow}>
          {/*multiple free actionss's may exist in one entity.*/}
          <p className={styles.formLabel}>Name:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Frequency:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Trigger:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple free action's may exist in one entity.*/}
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

export default FreeActionForm;
