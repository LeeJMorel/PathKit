import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const PassiveEffectForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
  count,
}) => {
  return (
    <>
      <CollapsibleHeader title={`Passive Effect ${count}`} toggle>
        <br />
        <div className={styles.formRow}>
          {/*multiple effects's may exist in one entity.*/}
          <p className={styles.formLabel}>Name:</p>
          <Field
            name="build.weapons"
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

export default PassiveEffectForm;
