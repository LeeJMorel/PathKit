import { Field } from "formik";
import { Proficiency } from "../../../api/model";
import styles from "../Form.module.scss";
import FormField from "../../formFields/FormField";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { abilityOptions, profLevelOptions, sizeOptions } from "../../../consts";
import { getAbilityModifier, getProficiencyModifier } from "../../../utilities";

const EntityGeneralForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
  onImageUpload,
  formProps,
}) => {
  const { values } = formProps;
  return (
    <>
      <div className={styles.formRow}>
        <FormField name="image" value={values.image} label="Image" />
      </div>
      <div className={styles.formRow}>
        <FormField name="name" value={values.name} label="Name" />
        <FormField
          name="build.level"
          type="number"
          value={values.build.level}
          label="Level"
        />
        <FormField
          name="build.size"
          as="select"
          label="Size"
          value={values.build.size}
        >
          {sizeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
      </div>
      {/* <div className={styles.formRow}>
        <p className={styles.formLabel}>Traits:</p>
        <Field
          name="build.traits"
          className={styles.formInput}
          value={values.build.traits}
        />
      </div> */}
      <div className={styles.formRow}>
        <FormField
          label={`Perception [${getProficiencyModifier(
            values,
            Proficiency.perception
          )}]`}
          name="build.proficiencies.perception"
          as="select"
          value={values.build.proficiencies.perception}
        >
          {profLevelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
        <FormField
          label="Key Ability"
          name="build.keyability"
          as="select"
          value={values.build.keyability}
        >
          {abilityOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
        {/* <p className={styles.formLabel}>Languages:</p>
        <Field name="build.languages" className={styles.formInput} />
        <p className={styles.formLabel}>Skills:</p>
        <Field name="build.skill" className={styles.formInput} /> */}
      </div>
      <div className={styles.formRow}>
        <FormField
          name="build.abilities.str"
          value={values.build.abilities.str}
          type="number"
          label={`STR [${getAbilityModifier(values.build.abilities.str)}]`}
          labelPosition="above"
          align="center"
          small
        />
        <FormField
          name="build.abilities.dex"
          value={values.build.abilities.dex}
          type="number"
          label={`DEX [${getAbilityModifier(values.build.abilities.dex)}]`}
          labelPosition="above"
          align="center"
          small
        />
        <FormField
          name="build.abilities.con"
          value={values.build.abilities.con}
          type="number"
          label={`CON [${getAbilityModifier(values.build.abilities.con)}]`}
          labelPosition="above"
          align="center"
          small
        />
        <FormField
          name="build.abilities.int"
          value={values.build.abilities.int}
          type="number"
          label={`INT [${getAbilityModifier(values.build.abilities.int)}]`}
          labelPosition="above"
          align="center"
          small
        />
        <FormField
          name="build.abilities.wis"
          value={values.build.abilities.wis}
          type="number"
          label={`WIS [${getAbilityModifier(values.build.abilities.wis)}]`}
          labelPosition="above"
          align="center"
          small
        />
        <FormField
          name="build.abilities.cha"
          value={values.build.abilities.cha}
          type="number"
          label={`CHA [${getAbilityModifier(values.build.abilities.cha)}]`}
          labelPosition="above"
          align="center"
          small
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          label="AC"
          labelPosition="above"
          align="center"
          name="build.acTotal.acTotal"
          value={values.build.acTotal.acTotal}
          type="number"
        />
        <FormField
          label={`DC [${getProficiencyModifier(values, Proficiency.classDC)}]`}
          labelPosition="above"
          align="center"
          name="build.proficiencies.classDC"
          value={values.build.proficiencies.classDC}
          as="select"
          type="number"
        >
          {profLevelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
      </div>
      <div className={styles.formRow}>
        <FormField
          label={`Will [${getProficiencyModifier(values, Proficiency.will)}]`}
          labelPosition="above"
          align="center"
          name="build.proficiencies.will"
          value={values.build.proficiencies.will}
          as="select"
          type="number"
        >
          {profLevelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
        <FormField
          label={`Reflex [${getProficiencyModifier(
            values,
            Proficiency.reflex
          )}]`}
          labelPosition="above"
          align="center"
          name="build.proficiencies.reflex"
          value={values.build.proficiencies.reflex}
          as="select"
          type="number"
        >
          {profLevelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
        <FormField
          label={`Fortitude [${getProficiencyModifier(
            values,
            Proficiency.fortitude
          )}]`}
          labelPosition="above"
          align="center"
          name="build.proficiencies.fortitude"
          value={values.build.proficiencies.fortitude}
          as="select"
          type="number"
        >
          {profLevelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
      </div>
      <div className={styles.formRow}>
        {/*multiple hp's may exist in one entity is it is a group. This will be
          based on monster quantity.*/}
        <div className={styles.formGroup}>
          <FormField
            label="Max HP"
            name="maxHp"
            value={values.maxHp}
            type="number"
          />
          {/* /
          <Field
            name="build.level"
            value={values.build.level}
            type="number"
            className={styles.formSmall}
          /> */}
        </div>
      </div>
      {/* <div className={styles.formRow}>
        <p className={styles.formLabel}>Conditions:</p>
        <Field name="conditions" className={styles.formInput} />
        <p className={styles.formLabel}>Resistances:</p>
        <Field name="resistances" className={styles.formInput} />
        <p className={styles.formLabel}>Immunities:</p>
        <Field name="immunities" className={styles.formInput} />
      </div> */}
      <div className={styles.formRow}>
        <FormField
          label="Speed"
          name="build.attributes.speed"
          value={values.build.attributes.speed}
          type="number"
          small
        />
        <FormField
          label="Fly"
          name="build.attributes.fly"
          value={values.build.attributes.fly}
          type="number"
          small
        />
        <FormField
          label="Burrow"
          name="build.attributes.burrow"
          value={values.build.attributes.burrow}
          type="number"
          small
        />
        <FormField
          label="Climb"
          name="build.attributes.climb"
          value={values.build.attributes.climb}
          type="number"
          small
        />
        <FormField
          label="Swim"
          name="build.attributes.swim"
          value={values.build.attributes.swim}
          type="number"
          small
        />
      </div>
    </>
  );
};

export default EntityGeneralForm;
