import { Ability, AbilityLong, Proficiency, Skill } from "../api/model";

interface AbilityOption {
  key: Ability;
  label: AbilityLong;
}

export const abilityOptions: AbilityOption[] = [
  { key: Ability.str, label: AbilityLong.str },
  { key: Ability.dex, label: AbilityLong.dex },
  { key: Ability.con, label: AbilityLong.con },
  { key: Ability.int, label: AbilityLong.int },
  { key: Ability.wis, label: AbilityLong.wis },
  { key: Ability.cha, label: AbilityLong.cha },
];

interface ISkill {
  skill: Skill;
  ability: Ability;
}

export const skillsMetadata: Record<Skill, ISkill> = {
  acrobatics: {
    skill: Skill.acrobatics,
    ability: Ability.dex,
  },
  arcana: {
    skill: Skill.arcana,
    ability: Ability.int,
  },
  athletics: {
    skill: Skill.athletics,
    ability: Ability.str,
  },
  crafting: {
    skill: Skill.crafting,
    ability: Ability.int,
  },
  deception: {
    skill: Skill.deception,
    ability: Ability.cha,
  },
  diplomacy: {
    skill: Skill.diplomacy,
    ability: Ability.cha,
  },
  intimidation: {
    skill: Skill.intimidation,
    ability: Ability.cha,
  },
  medicine: {
    skill: Skill.medicine,
    ability: Ability.wis,
  },
  nature: {
    skill: Skill.nature,
    ability: Ability.wis,
  },
  occultism: {
    skill: Skill.occultism,
    ability: Ability.int,
  },
  performance: {
    skill: Skill.performance,
    ability: Ability.cha,
  },
  religion: {
    skill: Skill.religion,
    ability: Ability.wis,
  },
  society: {
    skill: Skill.society,
    ability: Ability.int,
  },
  stealth: {
    skill: Skill.stealth,
    ability: Ability.dex,
  },
  survival: {
    skill: Skill.survival,
    ability: Ability.wis,
  },
  thievery: {
    skill: Skill.thievery,
    ability: Ability.dex,
  },
};

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
  { key: 0, label: "Untrained" },
  { key: 2, label: "Trained" },
  { key: 4, label: "Expert" },
  { key: 6, label: "Master" },
  { key: 8, label: "Legendary" },
];
