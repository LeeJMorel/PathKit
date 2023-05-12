import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const EquipmentForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
  count,
}) => {
  return (
    <>
      <div className={styles.formRow}>
        <p className={styles.formLabel}>Name:</p>
        <Field name="immunities" className={styles.formInput} />
        <p className={styles.formLabel}>Bulk:</p>
        <Field name="immunities" className={styles.formInput} />
        <p className={styles.formLabel}>Value:</p>
        <Field name="immunities" className={styles.formInput} />
        <p className={styles.formLabel}>Worn:</p>
        <Field name="immunities" className={styles.formInput} />
      </div>
    </>
  );
};

export default EquipmentForm;
