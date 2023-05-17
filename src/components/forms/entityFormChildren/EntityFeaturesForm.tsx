import { FieldArray } from "formik";
import styles from "../Form.module.scss";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import classNames from "classnames";
import { defaultFeat } from "../../../consts";

const EntityFeaturesForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;
  return (
    <CollapsibleHeader toggle title="Features" as="h4" nested>
      <FieldArray name="build.feats">
        {({ remove, push }) => (
          <div className={styles.formRow}>
            {values.build.feats.map((_, i) => {
              const [name, secondary, featType, level, desc] =
                values.build.feats[i];
              return (
                <>
                  <div className={styles.formRow}>
                    <FormField label={`Name`} name={`build.feats.${i}[0]`} />
                    <FormField
                      label={`Feat Type`}
                      name={`build.feats.${i}[2]`}
                    />
                    <FormField
                      label={`Level`}
                      name={`build.feats.${i}[3]`}
                      type="number"
                      small
                    />
                  </div>
                  <div className={styles.formRow}>
                    <FormField
                      label={`Secondary`}
                      name={`build.feats.${i}[1]`}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <FormField
                      label={`Description`}
                      name={`build.feats.${i}[4]`}
                      type="textarea"
                    />
                    <FormButton
                      variant="text"
                      icon="circle-minus"
                      onClick={() => remove(i)}
                      title="Remove Feature"
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
                onClick={() => push(defaultFeat)}
              >
                Add feature
              </FormButton>
            </div>
          </div>
        )}
      </FieldArray>
    </CollapsibleHeader>
  );
};

export default EntityFeaturesForm;
