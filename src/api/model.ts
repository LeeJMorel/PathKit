export enum EntityType {
  Shop = "Shop",
  Monster = "Monster",
  Player = "Player",
  NPC = "NPC",
  none = "none",
}

export interface IEntity {
  entityId: string | number;
  entityImage?: string; //an image for each object added
  entityName?: string;
  entityStats?: {
    [key: string]: number;
  };
  entityHp?: [number, number, number?]; // current hp, total hp, and temp hp
  entityEquipment?: string[];
  campaignId?: number;
  entityType?: EntityType;
  entityInitiative?: number;
  entityIsActive?: boolean;
}

export enum PlanType {
  exploration = "exploration",
  encounter = "encounter",
}

export interface IPlan {
  planId: string | number;
  planType: PlanType;
  campaignId?: number;
  // Array of entity Ids
  planEntities: (string | number)[];
  planOrderNum?: number;
}

export interface ICampaign {
  campaignId: string | number;
  campaignName: string;
  campaignDesc: string;
}

export interface INote {
  noteId: string | number;
  campaignId: string | number;
  noteTitle: string;
  noteBody: string;
  noteCreateDate: string;
  noteModifiedDate?: string;
}

export type Operator = "=" | "<>" | "!=" | "<" | ">" | "<=" | ">=";
export type SqliteOper = Operator | "IN" | "LIKE" | "BETWEEN";
export type SqlOrder = "DESC" | "ASC";
export type SqlOrderBy = [string, SqlOrder][];
