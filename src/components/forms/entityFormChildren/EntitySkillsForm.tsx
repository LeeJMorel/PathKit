import { Proficiency } from "../../../api/model";
import styles from "../Form.module.scss";
import FormField, { IFieldProps } from "../../formFields/FormField";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { profLevelOptions } from "../../../consts";
import { getProficiencyModifier } from "../../../utilities";
import CollapsibleHeader from "../../headers/CollapsibleHeader";

export const EntitySkillsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;
  const commonProps: IFieldProps = {
    name: "build.proficiencies",
    as: "select",
    width: 300,
    align: "end",
    children: profLevelOptions.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    )),
  };
  return (
    <CollapsibleHeader toggle title="Skills" as="h4" nested defaultCollapsed>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.acrobatics"
          label={`Acrobatics [${getProficiencyModifier(
            values,
            Proficiency.acrobatics,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.arcana"
          label={`Arcana [${getProficiencyModifier(
            values,
            Proficiency.arcana,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.athletics"
          label={`Athletics [${getProficiencyModifier(
            values,
            Proficiency.athletics,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.crafting"
          label={`Crafting [${getProficiencyModifier(
            values,
            Proficiency.crafting,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.deception"
          label={`Deception [${getProficiencyModifier(
            values,
            Proficiency.deception,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.diplomacy"
          label={`Diplomacy [${getProficiencyModifier(
            values,
            Proficiency.diplomacy,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.intimidation"
          label={`Intimidation [${getProficiencyModifier(
            values,
            Proficiency.intimidation,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.medicine"
          label={`Medicine [${getProficiencyModifier(
            values,
            Proficiency.medicine,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.nature"
          label={`Nature [${getProficiencyModifier(
            values,
            Proficiency.nature,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.occultism"
          label={`Occultism [${getProficiencyModifier(
            values,
            Proficiency.occultism,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.performance"
          label={`Performance [${getProficiencyModifier(
            values,
            Proficiency.performance,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.religion"
          label={`Religion [${getProficiencyModifier(
            values,
            Proficiency.religion,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.society"
          label={`Society [${getProficiencyModifier(
            values,
            Proficiency.society,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.stealth"
          label={`Stealth [${getProficiencyModifier(
            values,
            Proficiency.stealth,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.survival"
          label={`Survival [${getProficiencyModifier(
            values,
            Proficiency.survival,
            true
          )}]`}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          {...commonProps}
          name="build.proficiencies.thievery"
          label={`Thievery [${getProficiencyModifier(
            values,
            Proficiency.thievery,
            true
          )}]`}
        />
      </div>
    </CollapsibleHeader>
  );
};
