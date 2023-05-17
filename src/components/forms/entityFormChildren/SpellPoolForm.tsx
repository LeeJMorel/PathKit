import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import AddSpellForm from "./AddSpellForm";
import { useState } from "react";
import { Button } from "../../buttons";
import { IEntityFormChildrenProps } from "../AddEntityForm";

const SpellPoolForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index: count,
}) => {
  const [spells, setSpells] = useState<number[]>([]);

  const handleAddSpell = () => {
    setSpells([...spells, spells.length + 1]);
  };

  return (
    <>
      <CollapsibleHeader title={`Spell Pool ${count}`} toggle>
        <br />
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity.*/}
          <p className={styles.formLabel}>Tradition:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Casting Type:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple traits.*/}
          <p className={styles.formLabel}>DC:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
          <p className={styles.formLabel}>Attack:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          {/*multiple melee's may exist in one entity. may have multiple traits.*/}
          <p className={styles.formLabel}>Spells:</p>
          <Field
            name="build.level"
            type="number"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formCentered}>
          <Button className={styles.formButton} onClick={handleAddSpell}>
            Add a Spell
          </Button>
        </div>
        {spells.map((_, index) => (
          <AddSpellForm formProps={formProps} key={index} index={index + 1} />
        ))}
      </CollapsibleHeader>
    </>
  );
};

export default SpellPoolForm;
