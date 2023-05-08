export enum EntityType {
  Shop = "Shop",
  Monster = "Monster",
  Player = "Player",
  NPC = "NPC",
  none = "none",
}

export interface PartialEntity {
  image?: string;
  name?: string;
  type?: EntityType;
  initiative?: number;
  id?: number;
  campaignId?: number;
  noteId?: number;
  build?: IEntityBuild;
  damage?: number;
  tempHp?: number;
  conditions?: ICondition[];
}

export interface IEntity extends PartialEntity {
  id: number;
  campaignId: number;
}

/** Raw entity with JSON stringified data for storage in DB */
export interface IRawEntity extends Omit<IEntity, "conditions" | "build"> {
  conditions?: string;
  build?: string;
}

export interface IEntityBuild {
  name?: string;
  class?: string;
  level?: number;
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
  attributes?: IAttributes;
  abilities?: IAbilities;
  proficiencies?: { [key: string]: number };
  feats?: Feat[][];
  specials?: string[];
  lores?: Res[][];
  equipment?: Res[][];
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

export interface IAbilities {
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
}

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
  res?: Res;
  mat?: null;
  display?: string;
  worn?: boolean;
  runes?: any[];
  die?: string;
  str?: string;
}

export type Res = number | string;

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
