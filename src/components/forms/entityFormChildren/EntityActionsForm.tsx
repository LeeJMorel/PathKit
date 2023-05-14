import { Field, FieldArray } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import PassiveEffectsForm from "./PassiveEffectForm";
import ReactionForm from "./ReactionForm";
import FreeActionForm from "./FreeActionForm";
import ActionForm from "./ActionForm";

const EntityActionsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const [passiveEffect, setPassiveEffect] = useState<number[]>([]);
  const [reaction, setReaction] = useState<number[]>([]);
  const [freeAction, setFreeAction] = useState<number[]>([]);
  const [action, setAction] = useState<number[]>([]);

  const handlePassiveEffect = () => {
    setPassiveEffect((prev) => [...prev, passiveEffect.length]);
  };
  const handleReaction = () => {
    setReaction((prev) => [...prev, reaction.length]);
  };
  const handleFreeAction = () => {
    setFreeAction((prev) => [...prev, freeAction.length]);
  };
  const handleAction = () => {
    setAction((prev) => [...prev, action.length]);
  };

  console.log("debug: actions", {
    passiveEffect,
    reaction,
    freeAction,
    action,
  });

  return (
    <>
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handlePassiveEffect}>
          Add a Passive Effect
        </Button>
      </div>
      {passiveEffect.map((_, index) => (
        <PassiveEffectsForm
          formProps={formProps}
          key={index}
          index={index + 1}
          onRemove={() => setPassiveEffect(passiveEffect.splice(index, 1))}
        />
      ))}
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleReaction}>
          Add a Ranged Attack
        </Button>
      </div>
      {reaction.map((_, index) => (
        <ReactionForm
          formProps={formProps}
          key={index}
          index={index + 1}
          onRemove={() => setReaction(reaction.splice(index, 1))}
        />
      ))}
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleFreeAction}>
          Add a Free Action
        </Button>
      </div>
      {freeAction.map((_, index) => (
        <FreeActionForm
          formProps={formProps}
          key={index}
          index={index + 1}
          onRemove={() => setFreeAction(freeAction.splice(index, 1))}
        />
      ))}
      {/* <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleAction}>
          Add a Action
        </Button>
      </div>
      {action.map((_, index) => (
        <ActionForm
          formProps={formProps}
          key={index}
          index={index + 1}
          onRemove={() => setAction(action.splice(index, 1))}
        />
      ))} */}
      <FieldArray name="build.actions.action">
        {({ remove, push }) => (
          <ActionForm formProps={formProps} />
          // <div className={styles.formRow}>
          //   {values.build.traits.map((_, i) => (
          //     <div className={styles.formRow}>
          //       <FormField name={`build.traits.${i}`} />
          //       <FormButton
          //         variant="text"
          //         icon="circle-minus"
          //         onClick={() => remove(i)}
          //         title="Remove trait"
          //       />
          //     </div>
          //   ))}
          //   <div className={styles.formCol}>
          //     <FormButton
          //       variant="subtle"
          //       icon="circle-plus"
          //       onClick={() => push("")}
          //     >
          //       Add trait
          //     </FormButton>
          //   </div>
          // </div>
        )}
      </FieldArray>
    </>
  );
};

export default EntityActionsForm;
