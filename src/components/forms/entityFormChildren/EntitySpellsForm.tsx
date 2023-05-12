import { useState } from "react";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { Button } from "../../buttons";
import SpellPoolForm from "./SpellPoolForm";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const EntitySpellsForm: React.FC<IEntityFormChildrenProps> = ({ entity }) => {
  const [spellPools, setSpellPools] = useState<number[]>([]);

  const handleAddSpellPool = () => {
    setSpellPools([...spellPools, spellPools.length + 1]);
  };

  return (
    <>
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleAddSpellPool}>
          Add a Spell Pool
        </Button>
      </div>
      {spellPools.map((_, index) => (
        <SpellPoolForm entity={entity} key={index} count={index + 1} />
      ))}
    </>
  );
};

export default EntitySpellsForm;
