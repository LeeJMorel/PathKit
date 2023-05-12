import { Field } from "formik";
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

const EntityActionsForm: React.FC<IEntityFormChildrenProps> = ({ entity }) => {
  const [passiveEffect, setPassiveEffect] = useState<number[]>([]);
  const [reaction, setReaction] = useState<number[]>([]);
  const [freeAction, setFreeAction] = useState<number[]>([]);
  const [action, setAction] = useState<number[]>([]);

  const handlePassiveEffect = () => {
    setPassiveEffect([...passiveEffect, passiveEffect.length + 1]);
  };
  const handleReaction = () => {
    setReaction([...reaction, reaction.length + 1]);
  };
  const handleFreeAction = () => {
    setFreeAction([...freeAction, freeAction.length + 1]);
  };
  const handleAction = () => {
    setAction([...action, action.length + 1]);
  };

  return (
    <>
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handlePassiveEffect}>
          Add a Passive Effect
        </Button>
      </div>
      {passiveEffect.map((_, index) => (
        <PassiveEffectsForm entity={entity} key={index} count={index + 1} />
      ))}
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleReaction}>
          Add a Ranged Attack
        </Button>
      </div>
      {reaction.map((_, index) => (
        <ReactionForm entity={entity} key={index} count={index + 1} />
      ))}
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleFreeAction}>
          Add a Free Action
        </Button>
      </div>
      {reaction.map((_, index) => (
        <FreeActionForm entity={entity} key={index} count={index + 1} />
      ))}
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleAction}>
          Add a Action
        </Button>
      </div>
      {action.map((_, index) => (
        <ActionForm entity={entity} key={index} count={index + 1} />
      ))}
    </>
  );
};

export default EntityActionsForm;
