import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";

const PassiveEffectForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index: count,
  onRemove,
}) => {
  return (
    <>
      <CollapsibleHeader
        title={`Passive Effect ${count}`}
        toggle
        onRemove={onRemove}
      >
        <br />
        <div className={styles.formRow}>
          {/*multiple effects's may exist in one entity.*/}
          <p className={styles.formLabel}>Name:</p>
          <FormField
            name="build.weapons"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Effect:</p>
          <FormField
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
      </CollapsibleHeader>
    </>
  );
};

export default PassiveEffectForm;
