import { FieldArray } from "formik";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import styles from "../Form.module.scss";
import { defaultTrait, traitOptions } from "../../../consts";

const RangedForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index = 0,
  onRemove,
}) => {
  const { values } = formProps;
  return (
    <>
      <CollapsibleHeader
        title={`Ranged ${index + 1}`}
        toggle
        onRemove={onRemove}
        as="h4"
        nested
      >
        <div className={styles.formRow}>
          <FormField label="Name" name={`build.actions.ranged.${index}.name`} />
        </div>
        <div className={styles.formRow}>
          <FormField
            label="Action number"
            name={`build.actions.ranged.${index}.actionNumber`}
            type="number"
            small
          />
          <FormField
            label="Attack / DC"
            name={`build.actions.ranged.${index}.attackDc`}
            type="number"
            small
          />
          <FormField
            label="Range"
            name={`build.actions.ranged.${index}.range`}
            type="number"
            small
          />
          <FormField
            label="Damage Type"
            name={`build.actions.ranged.${index}.damageType`}
          />
        </div>
        <label>Damage</label>
        <div className={styles.formRow}>
          <FormField
            label="Value"
            name={`build.actions.ranged.${index}.damageValue`}
            placeholder="Dice roll e.g. 2d6+1d4+8"
          />
        </div>
        <div className={styles.formRow}>
          <FormField
            label="Extra Damage"
            name={`build.actions.ranged.${index}.extra`}
            as="textarea"
            style={{ resize: "vertical" }}
          />
        </div>
        <div className={styles.formRow}>
          <label>Traits</label>

          <FieldArray name={`build.actions.ranged.${index}.traits`}>
            {({ push, remove }) => (
              <>
                <div className={styles.formRow}>
                  {values.build.actions.ranged[index].traits.map((_, tI) => (
                    <div className={styles.formRow}>
                      <FormField
                        name={`build.actions.ranged.${index}.traits.${tI}[0]`}
                      />
                      <FormField
                        label="Tag"
                        name={`build.actions.ranged.${index}.traits.${tI}[1]`}
                        as="select"
                      >
                        {traitOptions.map((o) => (
                          <option key={o.tag} value={o.tag}>
                            {o.tag}
                          </option>
                        ))}
                      </FormField>
                      <FormButton
                        icon="circle-minus"
                        onClick={() => remove(tI)}
                      />
                    </div>
                  ))}
                  <FormButton
                    icon="circle-plus"
                    onClick={() => push(defaultTrait)}
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

export default RangedForm;
