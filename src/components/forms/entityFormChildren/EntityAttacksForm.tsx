import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { Button } from "../../buttons";
import MeleeForm from "./MeleeForm";
import { useState } from "react";
import RangedForm from "./RangedForm";

const EntityAttacksForm: React.FC<IEntityFormChildrenProps> = ({ entity }) => {
  const [meleeAttacks, setMeleeAttacks] = useState<number[]>([]);
  const [rangedAttacks, setRangedAttacks] = useState<number[]>([]);

  const handleMeleeAttacks = () => {
    setMeleeAttacks([...meleeAttacks, meleeAttacks.length + 1]);
  };
  const handleRangedAttacks = () => {
    setRangedAttacks([...rangedAttacks, rangedAttacks.length + 1]);
  };

  return (
    <>
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleMeleeAttacks}>
          Add a Melee Attack
        </Button>
      </div>
      {meleeAttacks.map((_, index) => (
        <MeleeForm entity={entity} key={index} count={index + 1} />
      ))}
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleRangedAttacks}>
          Add a Ranged Attack
        </Button>
      </div>
      {rangedAttacks.map((_, index) => (
        <RangedForm entity={entity} key={index} count={index + 1} />
      ))}
    </>
  );
};

export default EntityAttacksForm;
