import { Field, FieldArray } from "formik";
import { PartialEntity } from "../../../api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import PassiveActionsForm from "./EntityActionsForm.Passive";
import ReactionsForm from "./EntityActionsForm.Reactions";
import FreeActionsForm from "./EntityActionsForm.FreeActions";
import ActionsForm from "./EntityActionsForm.Actions";
import FormButton from "../../formFields/FormButton";
import {
  defaultAction,
  defaultFreeAction,
  defaultPassiveAction,
  defaultReaction,
} from "../../../consts";

const EntityActionsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;

  return (
    <>
      <CollapsibleHeader title="Actions" toggle nested>
        <FieldArray name="build.actions.actions">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.actions.actions.map((_, i) => (
                  <ActionsForm
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
                  onClick={() => push(defaultAction)}
                >
                  Add an action
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
      <CollapsibleHeader title="Free actions" toggle nested>
        <FieldArray name="build.actions.freeActions">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.actions.freeActions.map((_, i) => (
                  <FreeActionsForm
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
                  onClick={() => push(defaultFreeAction)}
                >
                  Add a free action
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
      <CollapsibleHeader title="Reactions" toggle nested>
        <FieldArray name="build.actions.reactions">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.actions.reactions.map((_, i) => (
                  <ReactionsForm
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
                  onClick={() => push(defaultReaction)}
                >
                  Add a reaction
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
      <CollapsibleHeader title="Passive actions" toggle nested>
        <FieldArray name="build.actions.passiveActions">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.actions.passiveActions.map((_, i) => (
                  <PassiveActionsForm
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
                  onClick={() => push(defaultPassiveAction)}
                >
                  Add a passive action
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
