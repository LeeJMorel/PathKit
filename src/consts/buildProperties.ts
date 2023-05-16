import {
  Ability,
  AbilityLong,
  Proficiency,
  EntityType,
  MagicTradition,
  SpellcastingType,
} from "../api/model";

interface AbilityOption {
  value: Ability;
  label: AbilityLong;
}

export const abilities = [
  Ability.cha,
  Ability.con,
  Ability.dex,
  Ability.int,
  Ability.str,
  Ability.wis,
];

export const abilityOptions: AbilityOption[] = [
  { value: Ability.str, label: AbilityLong.str },
  { value: Ability.dex, label: AbilityLong.dex },
  { value: Ability.con, label: AbilityLong.con },
  { value: Ability.int, label: AbilityLong.int },
  { value: Ability.wis, label: AbilityLong.wis },
  { value: Ability.cha, label: AbilityLong.cha },
];

export const magicTraditions = [
  MagicTradition.arcane,
  MagicTradition.divine,
  MagicTradition.occult,
  MagicTradition.primal,
];

export const spellcastingTypes = [
  SpellcastingType.prepared,
  SpellcastingType.spontaneous,
];

interface IProficiency {
  prof: Proficiency;
  ability: Ability | "keyability";
}

export const proficiencyMetadata: Record<Proficiency, IProficiency> = {
  acrobatics: {
    prof: Proficiency.acrobatics,
    ability: Ability.dex,
  },
  arcana: {
    prof: Proficiency.arcana,
    ability: Ability.int,
  },
  athletics: {
    prof: Proficiency.athletics,
    ability: Ability.str,
  },
  crafting: {
    prof: Proficiency.crafting,
    ability: Ability.int,
  },
  deception: {
    prof: Proficiency.deception,
    ability: Ability.cha,
  },
  diplomacy: {
    prof: Proficiency.diplomacy,
    ability: Ability.cha,
  },
  intimidation: {
    prof: Proficiency.intimidation,
    ability: Ability.cha,
  },
  medicine: {
    prof: Proficiency.medicine,
    ability: Ability.wis,
  },
  nature: {
    prof: Proficiency.nature,
    ability: Ability.wis,
  },
  occultism: {
    prof: Proficiency.occultism,
    ability: Ability.int,
  },
  performance: {
    prof: Proficiency.performance,
    ability: Ability.cha,
  },
  religion: {
    prof: Proficiency.religion,
    ability: Ability.wis,
  },
  society: {
    prof: Proficiency.society,
    ability: Ability.int,
  },
  stealth: {
    prof: Proficiency.stealth,
    ability: Ability.dex,
  },
  survival: {
    prof: Proficiency.survival,
    ability: Ability.wis,
  },
  thievery: {
    prof: Proficiency.thievery,
    ability: Ability.dex,
  },
  classDC: {
    prof: Proficiency.classDC,
    ability: "keyability",
  },
  perception: {
    prof: Proficiency.perception,
    ability: Ability.wis,
  },
  fortitude: {
    prof: Proficiency.fortitude,
    ability: Ability.con,
  },
  reflex: {
    prof: Proficiency.reflex,
    ability: Ability.dex,
  },
  will: {
    prof: Proficiency.will,
    ability: Ability.wis,
  },

  // TODO Clarify if these are all keyability proficiencies
  heavy: {
    prof: Proficiency.heavy,
    ability: Ability.dex,
  },
  medium: {
    prof: Proficiency.medium,
    ability: Ability.dex,
  },
  light: {
    prof: Proficiency.light,
    ability: Ability.dex,
  },
  unarmored: {
    prof: Proficiency.unarmored,
    ability: Ability.dex,
  },
  advanced: {
    prof: Proficiency.advanced,
    ability: Ability.str,
  },
  martial: {
    prof: Proficiency.martial,
    ability: Ability.str,
  },
  simple: {
    prof: Proficiency.simple,
    ability: Ability.str,
  },
  unarmed: {
    prof: Proficiency.unarmed,
    ability: Ability.str,
  },
  castingArcane: {
    prof: Proficiency.castingArcane,
    ability: "keyability",
  },
  castingDivine: {
    prof: Proficiency.castingDivine,
    ability: "keyability",
  },
  castingOccult: {
    prof: Proficiency.castingOccult,
    ability: "keyability",
  },
  castingPrimal: {
    prof: Proficiency.castingPrimal,
    ability: "keyability",
  },
};

export const skills: Proficiency[] = [
  Proficiency.acrobatics,
  Proficiency.arcana,
  Proficiency.athletics,
  Proficiency.crafting,
  Proficiency.deception,
  Proficiency.diplomacy,
  Proficiency.intimidation,
  Proficiency.medicine,
  Proficiency.nature,
  Proficiency.occultism,
  Proficiency.performance,
  Proficiency.religion,
  Proficiency.society,
  Proficiency.stealth,
  Proficiency.survival,
  Proficiency.thievery,
];

export const proficiencies: Proficiency[] = [
  Proficiency.classDC,
  Proficiency.perception,
  Proficiency.fortitude,
  Proficiency.reflex,
  Proficiency.will,
  Proficiency.heavy,
  Proficiency.medium,
  Proficiency.light,
  Proficiency.unarmored,
  Proficiency.advanced,
  Proficiency.martial,
  Proficiency.simple,
  Proficiency.unarmed,
  Proficiency.castingArcane,
  Proficiency.castingDivine,
  Proficiency.castingOccult,
  Proficiency.castingPrimal,
  Proficiency.acrobatics,
  Proficiency.arcana,
  Proficiency.athletics,
  Proficiency.crafting,
  Proficiency.deception,
  Proficiency.diplomacy,
  Proficiency.intimidation,
  Proficiency.medicine,
  Proficiency.nature,
  Proficiency.occultism,
  Proficiency.performance,
  Proficiency.religion,
  Proficiency.society,
  Proficiency.stealth,
  Proficiency.survival,
  Proficiency.thievery,
];

export const profLevelOptions = [
  { value: 0, label: "+0 Untrained" },
  { value: 2, label: "+2 Trained" },
  { value: 4, label: "+4 Expert" },
  { value: 6, label: "+6 Master" },
  { value: 8, label: "+8 Legendary" },
];

export const sizeOptions = [
  { value: 0, label: "Tiny" },
  { value: 1, label: "Small" },
  { value: 2, label: "Medium" },
  { value: 3, label: "Large" },
  { value: 4, label: "Huge" },
  { value: 5, label: "Gargantuan" },
];

export const entityTypes: EntityType[] = [
  EntityType.Monster,
  EntityType.NPC,
  EntityType.Player,
  EntityType.Shop,
];
