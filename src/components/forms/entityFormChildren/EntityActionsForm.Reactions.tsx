import { FieldArray } from "formik";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import styles from "../Form.module.scss";

const ReactionsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index = 0,
  onRemove,
}) => {
  const { values } = formProps;
  return (
    <CollapsibleHeader
      title={`Reaction ${index + 1}`}
      toggle
      onRemove={onRemove}
      as="h4"
      nested
    >
      <div className={styles.formRow}>
        <FormField
          label="Name"
          name={`build.actions.reactions.${index}.name`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          label="Frequency"
          name={`build.actions.reactions.${index}.frequency`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          label="Effect"
          name={`build.actions.reactions.${index}.effect`}
          as="textarea"
          style={{ resize: "vertical" }}
        />
      </div>
    </CollapsibleHeader>
  );
};

export default ReactionsForm;
