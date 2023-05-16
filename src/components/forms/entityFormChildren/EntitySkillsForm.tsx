import { Proficiency } from "../../../api/model";
import styles from "../Form.module.scss";
import FormField from "../../formFields/FormField";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { profLevelOptions } from "../../../consts";
import { getProficiencyModifier } from "../../../utilities";
import CollapsibleHeader from "../../headers/CollapsibleHeader";

export const EntitySkillsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;
  return (
    <CollapsibleHeader toggle title="Skills" as="h4" nested defaultCollapsed>
      <div className={styles.formRow}>
        <FormField
          as="select"
          width={300}
          name="build.proficiencies.acrobatics"
          label={`Acrobatics [${getProficiencyModifier(
            values,
            Proficiency.acrobatics,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.arcana"
          label={`Arcana [${getProficiencyModifier(
            values,
            Proficiency.arcana,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.athletics"
          label={`Athletics [${getProficiencyModifier(
            values,
            Proficiency.athletics,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.crafting"
          label={`Crafting [${getProficiencyModifier(
            values,
            Proficiency.crafting,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.deception"
          label={`Deception [${getProficiencyModifier(
            values,
            Proficiency.deception,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.diplomacy"
          label={`Diplomacy [${getProficiencyModifier(
            values,
            Proficiency.diplomacy,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.intimidation"
          label={`Intimidation [${getProficiencyModifier(
            values,
            Proficiency.intimidation,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.medicine"
          label={`Medicine [${getProficiencyModifier(
            values,
            Proficiency.medicine,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.nature"
          label={`Nature [${getProficiencyModifier(
            values,
            Proficiency.nature,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.occultism"
          label={`Occultism [${getProficiencyModifier(
            values,
            Proficiency.occultism,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.performance"
          label={`Performance [${getProficiencyModifier(
            values,
            Proficiency.performance,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.religion"
          label={`Religion [${getProficiencyModifier(
            values,
            Proficiency.religion,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.society"
          label={`Society [${getProficiencyModifier(
            values,
            Proficiency.society,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.stealth"
          label={`Stealth [${getProficiencyModifier(
            values,
            Proficiency.stealth,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.survival"
          label={`Survival [${getProficiencyModifier(
            values,
            Proficiency.survival,
            true
          )}]`}
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
          as="select"
          width={300}
          name="build.proficiencies.thievery"
          label={`Thievery [${getProficiencyModifier(
            values,
            Proficiency.thievery,
            true
          )}]`}
        >
          {profLevelOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FormField>
      </div>
    </CollapsibleHeader>
  );
};
