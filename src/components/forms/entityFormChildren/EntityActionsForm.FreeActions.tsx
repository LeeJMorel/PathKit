import { FieldArray } from "formik";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import styles from "../Form.module.scss";

const FreeActionsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index = 0,
  onRemove,
}) => {
  const { values } = formProps;
  return (
    <CollapsibleHeader
      title={`Free action ${index + 1}`}
      toggle
      onRemove={onRemove}
      as="h4"
      nested
    >
      <div className={styles.formRow}>
        <FormField
          label="Name"
          name={`build.actions.freeActions.${index}.name`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          label="Frequency"
          name={`build.actions.freeActions.${index}.frequency`}
        />
        <FormField
          label="Trigger"
          name={`build.actions.freeActions.${index}.trigger`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          label="Effect"
          name={`build.actions.freeActions.${index}.effect`}
          as="textarea"
          style={{ resize: "vertical" }}
        />
      </div>
    </CollapsibleHeader>
  );
};

export default FreeActionsForm;
