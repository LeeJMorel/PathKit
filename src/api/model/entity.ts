export enum EntityType {
  Structure = "Structure",
  Monster = "Monster",
  Player = "Player",
  NPC = "NPC",
  Hazard = "Hazard",
  none = "none",
}

export interface PartialEntity {
  image?: string;
  name: string;
  type: EntityType;
  initiative: number;
  noteId?: string | null;
  build: IEntityBuild;
  damage: number[];
  tempHp: number[];
  /** Should not use on player entities, this should be calculated instead */
  maxHp?: number | null;
  conditions: ICondition[];
  quantity: number;
  id?: string;
  campaignId?: string;
}

export interface IEntity extends PartialEntity {
  id: string;
  campaignId: string;
}

export interface IUpdateEntity extends Partial<IEntity> {
  id: string;
}

type EntityJsonStringKeys = "conditions" | "build" | "damage" | "tempHp";

/** Raw entity with JSON stringified data for storage in DB */
export interface IRawEntity extends Omit<IEntity, EntityJsonStringKeys> {
  conditions?: string;
  build?: string;
  damage?: string;
  tempHp?: string;
}

//entity builds are based on the JSON string import from PathBuilder 2e
export interface IEntityBuild {
  name?: string;
  class?: string;
  desc?: string;
  level: number;
  ancestry?: string;
  heritage?: string;
  background?: string;
  alignment?: string;
  gender?: string;
  age?: string;
  deity?: string;
  size?: number;
  keyability?: Ability;
  languages: string[];
  attributes: IAttributes;
  abilities: TAbilities;
  proficiencies: {
    [key: string]: number;
  };
  feats: Feat[];
  specials: string[];
  lores: Lore[];
  equipment: Equipment[];
  specificProficiencies: ISpecificProficiencies;
  weapons: IEquipable[];
  money: IMoney;
  armor: IEquipable[];
  focus: IFocus;
  spellCasters: ISpellCaster[];
  formula: any[];
  pets: string[];
  acTotal: IACTotal;
  traits: Trait[];
  resistances: string[];
  immunities: string[];
  actions: {
    actions: IAction[];
    freeActions: IFreeAction[];
    reactions: IReaction[];
    passiveActions: IPassiveAction[];
    melee: IMelee[];
    ranged: IRanged[];
  };
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

export interface IEquipable {
  name?: string;
  qty?: number;
  prof?: string;
  pot?: number;
  res?: number | string;
  mat?: string | null;
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
  fly?: number;
  burrow?: number;
  climb?: number;
  swim?: number;
}

export type Feat = [
  name: string,
  secondary: string | null | undefined,
  featType: string | null | undefined,
  level: number | undefined,
  desc: string | undefined | null
];

export type Lore = [name: string, proficiency: number];

export enum TraitType {
  Uncommon = "Uncommon",
  Rare = "Rare",
  Unique = "Unique",
  Size = "Size",
  Keyword = "Keyword",
  none = "none",
}

export type Trait = [name: string, tag?: TraitType];

export type Equipment = [
  name: string,
  quantity: number,
  bulk?: number,
  value?: string,
  worn?: boolean
];

export enum MagicTradition {
  primal = "primal",
  occult = "occult",
  arcane = "arcane",
  divine = "divine",
}

export enum SpellcastingType {
  spontaneous = "spontaneous",
  prepared = "prepared",
}

export interface IFocus {
  focusPoints?: number;
  [MagicTradition.arcane]?: TFocusSpellPool;
  [MagicTradition.divine]?: TFocusSpellPool;
  [MagicTradition.primal]?: TFocusSpellPool;
  [MagicTradition.occult]?: TFocusSpellPool;
}

export type TFocusSpellPool = {
  [key in Ability]?: IFocusSpell;
};

export interface IFocusSpell {
  abilityBonus?: number;
  proficiency?: number;
  itemBonus?: number;
  focusSpells?: string[];
  focusCantrips?: string[];
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
  magicTradition?: MagicTradition;
  spellcastingType?: SpellcastingType;
  ability?: Ability;
  proficiency?: number;
  focusPoints?: number;
  spells?: ISpellLevel[];
  perDay?: number[];
}

export interface ISpellLevel {
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

export enum ActionNumber {
  One = 1,
  Two = 2,
  Three = 3,
  Zero = 0,
}
export interface IPassiveAction {
  name: string;
  effect: string;
}

export interface IReaction {
  name: string;
  trigger: string;
  effect: string;
}

export interface IFreeAction {
  name: string;
  frequency: string;
  trigger: string;
  effect: string;
}

export interface IAction {
  actionNumber: ActionNumber;
  name: string;
  attackDc: number;
  traits: Trait[];
  effect: string;
}

export interface IMelee {
  actionNumber: ActionNumber;
  name: string;
  attackDc: number;
  damageType: string;
  traits: Trait[];
  damageValue: string;
  extra: string;
}

export interface IRanged extends IMelee {
  range: number;
}
