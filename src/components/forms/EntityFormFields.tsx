import React from "react";
import { AbilityLong, EntityType, PartialEntity } from "../../api/model";
import { getMaxPlayerHp, isBase64UrlImage } from "../../utilities";
import { abilityOptions, profLevelOptions, proficiencies } from "../../consts";

type GenericInput = HTMLInputElement & HTMLTextAreaElement;

interface IFormFieldProps<O = unknown> extends React.HTMLProps<GenericInput> {
  /** The name of the field as it appears in the dataset */
  name: string;
  /** The label that appears by the input */
  label: string;
  /** Organize fields by groups */
  group?: string;
  /** Determines what JSX is rendered */
  inputType:
    | "text"
    | "number"
    | "checkbox"
    | "radio"
    | "textarea"
    | "dropdown"
    | "multiselect"
    | "file";

  multipleFields?: boolean;

  multipleFieldsType?: "list" | "dict";

  value?: any;

  /** For use when multipleFieldsType === "dict". Provides suggestions on names for the keys */
  keySuggestions?: any[];

  options?: any[];

  onChange?: (event: React.ChangeEvent<GenericInput>, ...args: any[]) => void;

  validation?: (...args: any[]) => boolean | Promise<boolean>;

  errorMessage?: string;

  getIsRequired?: (type?: EntityType) => boolean;
}

export const getEntityFormFields = (
  entity: PartialEntity,
  setEntity: React.Dispatch<React.SetStateAction<PartialEntity>>
): Record<string, IFormFieldProps[]> => ({
  general: [
    {
      name: "name",
      label: "Name",
      group: "general",
      inputType: "text",
      value: entity.name,
      validation: (value: string) => value.length > 0,
      errorMessage: "Name cannot be empty",
      required: true,
    },
    {
      name: "image",
      label: "Portrait",
      group: "general",
      inputType: "file",
      value: entity.image,
      validation: (image: string) => isBase64UrlImage(image),
      errorMessage: "The image provided is invalid.",
    },
    {
      name: "build.level",
      label: "Level",
      group: "general",
      inputType: "number",
      value: entity.build.level || 1,
      validation: (value: number) => value > 0 && value <= 20,
      errorMessage: "Invalid level",
      onChange: (e) => {
        const { value } = e?.target;
        const level = Number(value);
        setEntity((prev) => ({
          ...prev,
          level,
          maxHp: getMaxPlayerHp({ ...prev, level } as PartialEntity),
        }));
      },
      min: 1,
      max: 20,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.ancestry",
      label: "Ancestry",
      group: "general",
      inputType: "text",
      value: entity.build.ancestry,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.heritage",
      label: "Heritage",
      group: "general",
      inputType: "text",
      value: entity.build.heritage,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.background",
      label: "Background",
      group: "general",
      inputType: "text",
      value: entity.build.background,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.gender",
      label: "Gender",
      group: "general",
      inputType: "text",
      value: entity.build.gender,
    },
    {
      name: "build.age",
      label: "Age",
      group: "general",
      inputType: "text",
      value: entity.build.age,
    },
    {
      name: "build.deity",
      label: "Deity",
      group: "general",
      inputType: "text",
      value: entity.build.deity,
    },
    {
      name: "build.languages",
      label: "Languages",
      group: "general",
      inputType: "text",
      multipleFields: true,
      multipleFieldsType: "list",
      value: entity.build.languages,
    },
    {
      name: "build.size",
      label: "Languages",
      group: "general",
      inputType: "text",
      multipleFields: true,
      multipleFieldsType: "list",
      value: entity.build.size,
    },
  ],

  abilities: [
    {
      name: "build.keyability",
      label: "Key ability",
      group: "abilities",
      inputType: "dropdown",
      options: abilityOptions,
      value: entity.build.keyability,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.abilities.str",
      label: AbilityLong.str,
      group: "abilities",
      inputType: "number",
      value: entity.build.abilities?.str || 10,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.abilities.dex",
      label: AbilityLong.dex,
      group: "abilities",
      inputType: "number",
      value: entity.build.abilities?.dex || 10,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.abilities.con",
      label: AbilityLong.con,
      group: "abilities",
      inputType: "number",
      value: entity.build.abilities?.con || 10,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.abilities.int",
      label: AbilityLong.int,
      group: "abilities",
      inputType: "number",
      value: entity.build.abilities?.int || 10,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.abilities.wis",
      label: AbilityLong.wis,
      group: "abilities",
      inputType: "number",
      value: entity.build.abilities?.wis || 10,
      getIsRequired: (type) => type === EntityType.Player,
    },
    {
      name: "build.abilities.cha",
      label: AbilityLong.cha,
      group: "abilities",
      inputType: "number",
      value: entity.build.abilities?.cha || 10,
      getIsRequired: (type) => type === EntityType.Player,
    },
  ],

  proficiencies: [
    {
      name: "build.proficiencies",
      label: "Proficiencies",
      group: "abilities",
      inputType: "radio",
      multipleFields: true,
      multipleFieldsType: "dict",
      keySuggestions: proficiencies,
      options: profLevelOptions,
      value: entity.build.proficiencies || {},
      getIsRequired: (type) => type === EntityType.Player,
    },
  ],
});
