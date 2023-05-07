export enum EntityType {
  Shop = "Shop",
  Monster = "Monster",
  Player = "Player",
  NPC = "NPC",
  none = "none",
}

export interface PartialEntity {
  image?: string; //an image for each object added
  name?: string;
  stats?: {
    [key: string]: number;
  };
  hp?: [number, number, number?]; // current hp, total hp, and temp hp
  equipment?: string[];
  type?: EntityType;
  initiative?: number;
  id?: number;
  campaignId?: string | number;
}

export interface IEntity extends PartialEntity {
  id: number;
  campaignId: number;
}

export enum PlanType {
  exploration = "exploration",
  encounter = "encounter",
}

export interface PartialPlan {
  type: PlanType;
  // Array of entity Ids
  entities: (string | number)[];
  orderNum?: number;
  id?: number;
  campaignId?: string | number;
}

export interface IPlan extends PartialPlan {
  id: number;
  campaignId: number;
}

export interface PartialCampaign {
  name: string;
  desc: string;
  id?: number;
}

export interface ICampaign extends PartialCampaign {
  id: number;
}

export interface PartialNote {
  title: string;
  body: string;
  id?: number;
  campaignId?: string | number;
  createDate?: string;
  modifiedDate?: string;
}

export interface INote extends PartialNote {
  id: number;
  campaignId: number;
  createDate: string;
  modifiedDate?: string;
}

export type Operator = "=" | "<>" | "!=" | "<" | ">" | "<=" | ">=";
export type SqliteOper = Operator | "IN" | "LIKE" | "BETWEEN";
export type SqlOrder = "DESC" | "ASC";
export type SqlOrderBy = [string, SqlOrder][];

export interface Entity {
  name: string;
  class: string;
  level: number;
  ancestry: string;
  heritage: string;
  background: string;
  alignment: string;
  gender: string;
  age: string;
  deity: string;
  size: number;
  keyability: string;
  languages: string[];
  attributes: Attributes;
  abilities: Abilities;
  proficiencies: { [key: string]: number };
  feats: Array<Feat[]>;
  specials: string[];
  lores: Array<Res[]>;
  equipment: Array<Res[]>;
  specificProficiencies: SpecificProficiencies;
  weapons: Armor[];
  money: Money;
  armor: Armor[];
  focus: Focus;
  spellCasters: SpellCaster[];
  formula: any[];
  pets: any[];
  acTotal: ACTotal;
}

export interface Abilities {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface ACTotal {
  acProfBonus: number;
  acAbilityBonus: number;
  acItemBonus: number;
  acTotal: number;
  shieldBonus: string;
}

export interface Armor {
  name: string;
  qty: number;
  prof: string;
  pot: number;
  res?: Res;
  mat?: null;
  display?: string;
  worn?: boolean;
  runes: any[];
  die?: string;
  str?: string;
}

export type Res = number | string;

export interface Attributes {
  ancestryhp: number;
  classhp: number;
  bonushp: number;
  bonushpPerLevel: number;
  speed: number;
  speedBonus: number;
}

export type Feat = number | null | string;

export interface Focus {
  focusPoints: number;
  primal: Primal;
}

export interface Primal {
  cha: Cha;
}

export interface Cha {
  abilityBonus: number;
  proficiency: number;
  itemBonus: number;
  focusSpells: string[];
}

export interface Money {
  pp: number;
  gp: number;
  sp: number;
  cp: number;
}

export interface SpecificProficiencies {
  trained: any[];
  expert: any[];
  master: any[];
  legendary: any[];
}

export interface SpellCaster {
  name: string;
  magicTradition: string;
  spellcastingType: string;
  ability: string;
  proficiency: number;
  focusPoints: number;
  spells: Spell[];
  perDay: number[];
}

export interface Spell {
  spellLevel: number;
  list: string[];
}
