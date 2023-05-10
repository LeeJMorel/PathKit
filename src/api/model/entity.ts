export enum EntityType {
  Shop = "Shop",
  Monster = "Monster",
  Player = "Player",
  NPC = "NPC",
  none = "none",
}

export interface PartialEntity {
  image?: string;
  name: string;
  type: EntityType;
  initiative: number;
  noteId?: number;
  build: IEntityBuild;
  damage: number;
  tempHp: number;
  /** Should not use on player entities, this should be calculated instead */
  maxHp?: number;
  conditions: ICondition[];
  id?: number;
  campaignId?: number;
}

export interface IEntity extends PartialEntity {
  id: number;
  campaignId: number;
}

export interface IUpdateEntity extends Partial<IEntity> {
  id: number;
}

/** Raw entity with JSON stringified data for storage in DB */
export interface IRawEntity extends Omit<IEntity, "conditions" | "build"> {
  conditions?: string;
  build?: string;
}

//entity builds are based on the JSON string import from PathBuilder 2e
export interface IEntityBuild {
  name?: string;
  class?: string;
  level: number;
  ancestry?: string;
  heritage?: string;
  background?: string;
  alignment?: string;
  gender?: string;
  age?: string;
  deity?: string;
  size?: number;
  keyability?: string;
  languages?: string[];
  attributes: IAttributes;
  abilities?: TAbilities;
  proficiencies?: {
    [key: string]: number;
  };
  feats?: Feat[][];
  specials?: string[];
  lores?: (number | string)[][];
  equipment?: (number | string)[][];
  specificProficiencies?: ISpecificProficiencies;
  weapons?: IArmor[];
  money?: IMoney;
  armor?: IArmor[];
  focus?: IFocus;
  spellCasters?: ISpellCaster[];
  formula?: any[];
  pets?: IEntity[];
  acTotal?: IACTotal;
}

export enum Ability {
  str = "str",
  dex = "dex",
  con = "con",
  int = "int",
  wis = "wis",
  cha = "cha",
}

export enum AbilityLong {
  str = "Strength",
  dex = "Dexterity",
  con = "Constitution",
  int = "Intelligence",
  wis = "Wisdom",
  cha = "Charisma",
}

export type TAbilities = {
  [key in Ability]: number;
};

export interface IACTotal {
  acProfBonus?: number;
  acAbilityBonus?: number;
  acItemBonus?: number;
  acTotal?: number;
  shieldBonus?: string;
}

export interface IArmor {
  name?: string;
  qty?: number;
  prof?: string;
  pot?: number;
  res?: number | string;
  mat?: null;
  display?: string;
  worn?: boolean;
  runes?: any[];
  die?: string;
  str?: string;
}

export interface IAttributes {
  ancestryhp?: number;
  classhp?: number;
  bonushp?: number;
  bonushpPerLevel?: number;
  speed?: number;
  speedBonus?: number;
}

export type Feat = number | null | string;

export interface IFocus {
  focusPoints?: number;
  primal?: IPrimal;
}

export interface IPrimal {
  cha?: ICha;
}

export interface ICha {
  abilityBonus?: number;
  proficiency?: number;
  itemBonus?: number;
  focusSpells?: string[];
}

export interface IMoney {
  pp?: number;
  gp?: number;
  sp?: number;
  cp?: number;
}

export interface ISpecificProficiencies {
  trained?: any[];
  expert?: any[];
  master?: any[];
  legendary?: any[];
}

export interface ISpellCaster {
  name?: string;
  magicTradition?: string;
  spellcastingType?: string;
  ability?: string;
  proficiency?: number;
  focusPoints?: number;
  spells?: ISpell[];
  perDay?: number[];
}

export interface ISpell {
  spellLevel?: number;
  list?: string[];
}

// TODO use Conditions from foundry vtt and interface with those
export interface ICondition {
  name: string;
  isValued: boolean;
  value?: number;
}

export enum Skill {
  acrobatics = "acrobatics",
  arcana = "arcana",
  athletics = "athletics",
  crafting = "crafting",
  deception = "deception",
  diplomacy = "diplomacy",
  intimidation = "intimidation",
  medicine = "medicine",
  nature = "nature",
  occultism = "occultism",
  performance = "performance",
  religion = "religion",
  society = "society",
  stealth = "stealth",
  survival = "survival",
  thievery = "thievery",
}

export enum Proficiency {
  classDC = "classDC",
  perception = "perception",
  fortitude = "fortitude",
  reflex = "reflex",
  will = "will",
  heavy = "heavy",
  medium = "medium",
  light = "light",
  unarmored = "unarmored",
  advanced = "advanced",
  martial = "martial",
  simple = "simple",
  unarmed = "unarmed",
  castingArcane = "castingArcane",
  castingDivine = "castingDivine",
  castingOccult = "castingOccult",
  castingPrimal = "castingPrimal",
  acrobatics = "acrobatics",
  arcana = "arcana",
  athletics = "athletics",
  crafting = "crafting",
  deception = "deception",
  diplomacy = "diplomacy",
  intimidation = "intimidation",
  medicine = "medicine",
  nature = "nature",
  occultism = "occultism",
  performance = "performance",
  religion = "religion",
  society = "society",
  stealth = "stealth",
  survival = "survival",
  thievery = "thievery",
}
