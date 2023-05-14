import { Field, FieldArray } from "formik";
import { PartialEntity } from "../../../api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import MeleeForm from "./EntityAttacksForm.Melee";
import RangedForm from "./EntityAttacksForm.Ranged";
import FormButton from "../../formFields/FormButton";
import { defaultMelee, defaultRanged } from "../../../consts";

const EntityActionsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;

  return (
    <>
      <CollapsibleHeader title="Melee Attacks" toggle nested>
        <FieldArray name="build.actions.melee">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.actions.melee.map((_, i) => (
                  <MeleeForm
                    formProps={formProps}
                    index={i}
                    onRemove={() => remove(i)}
                  />
                ))}
              </div>
              <div className={styles.formRow}>
                <FormButton
                  variant="subtle"
                  icon="circle-plus"
                  onClick={() => push(defaultMelee)}
                >
                  Add a melee attack
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
      <CollapsibleHeader title="Ranged Attacks" toggle nested>
        <FieldArray name="build.actions.ranged">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.actions.ranged.map((_, i) => (
                  <RangedForm
                    formProps={formProps}
                    index={i}
                    onRemove={() => remove(i)}
                  />
                ))}
              </div>
              <div className={styles.formRow}>
                <FormButton
                  variant="subtle"
                  icon="circle-plus"
                  onClick={() => push(defaultRanged)}
                >
                  Add a ranged attack
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
    </>
  );
};

export default EntityActionsForm;
