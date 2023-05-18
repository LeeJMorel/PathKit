import { FieldArray } from "formik";
import styles from "../Form.module.scss";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import classNames from "classnames";
import { defaultEquipment } from "../../../consts";

const EntityEquipmentForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;

  return (
    <CollapsibleHeader toggle title="Equipment" as="h4" nested>
      <FieldArray name="build.equipment">
        {({ remove, push }) => (
          <div className={styles.formRow}>
            {values.build.equipment.map((_, i) => {
              const [name, quantity, bulk, value, worn] =
                values.build.equipment[i];
              return (
                <>
                  <div className={styles.formRow}>
                    <FormField
                      label={`Name`}
                      name={`build.equipment.${i}[0]`}
                    />
                    <FormField
                      label={`Quantity`}
                      name={`build.equipment.${i}[1]`}
                      type="number"
                      small
                    />
                  </div>

                  <div className={styles.formRow}>
                    <FormField
                      label={`Bulk`}
                      name={`build.equipment.${i}[2]`}
                      type="number"
                      small
                    />
                    <FormField
                      label={`Value`}
                      name={`build.equipment.${i}[3]`}
                    />
                    <FormField
                      label={`Worn`}
                      name={`build.equipment.${i}[4]`}
                      type="checkbox"
                      small
                    />
                    <FormButton
                      variant="text"
                      icon="circle-minus"
                      onClick={() => remove(i)}
                      title="Remove equipment"
                    />
                  </div>
                  <div className={styles.formBreak} />
                </>
              );
            })}
            <div className={styles.formCol}>
              <FormButton
                variant="subtle"
                icon="circle-plus"
                onClick={() => push(defaultEquipment)}
              >
                Add equipment
              </FormButton>
            </div>
          </div>
        )}
      </FieldArray>
    </CollapsibleHeader>
  );
};

export default EntityEquipmentForm;
