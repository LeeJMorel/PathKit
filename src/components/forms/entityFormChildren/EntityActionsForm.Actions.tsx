import { FieldArray } from "formik";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import styles from "../Form.module.scss";

const ActionsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index = 0,
  onRemove,
}) => {
  const { values } = formProps;
  return (
    <>
      <CollapsibleHeader
        title={`Action ${index + 1}`}
        toggle
        onRemove={onRemove}
        as="h4"
        nested
      >
        <div className={styles.formRow}>
          <FormField
            label="Name"
            name={`build.actions.actions.${index}.name`}
          />
        </div>
        <div className={styles.formRow}>
          <FormField
            label="Action number"
            name={`build.actions.actions.${index}.actionNumber`}
            type="number"
            small
          />
          <FormField
            label="Attack / DC"
            name={`build.actions.actions.${index}.attackDc`}
            type="number"
            small
          />
        </div>
        <div className={styles.formRow}>
          <FormField
            label="Effect"
            name={`build.actions.actions.${index}.effect`}
            as="textarea"
            style={{ resize: "vertical" }}
          />
        </div>
        <div className={styles.formRow}>
          <label>Traits</label>

          <FieldArray name={`build.actions.actions.${index}.traits`}>
            {({ push, remove }) => (
              <>
                <div className={styles.formRow}>
                  {values.build.actions.actions[index].traits.map((_, tI) => (
                    <div className={styles.formRow}>
                      <FormField
                        name={`build.actions.actions.${index}.traits.${tI}`}
                      />
                      <FormButton
                        icon="circle-minus"
                        onClick={() => remove(tI)}
                      />
                    </div>
                  ))}
                  <FormButton
                    icon="circle-plus"
                    onClick={() => push("")}
                    variant="text"
                  >
                    Add trait
                  </FormButton>
                </div>
                {/* <div className={styles.formRow}>
                </div> */}
              </>
            )}
          </FieldArray>
        </div>
      </CollapsibleHeader>
    </>
  );
};

export default ActionsForm;
