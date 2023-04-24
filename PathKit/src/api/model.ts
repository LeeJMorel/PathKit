export enum EntityType {
  Shop = "Shop",
  Monster = "Monster",
  Player = "Player",
  NPC = "NPC",
  none = "none",
}

export interface IEntity {
  id: string;
  image: string; //an image for each object added
  name: string;
  stats?: {
    [key: string]: number;
  };
  hp?: [number, number, number?]; // current hp, total hp, and temp hp
  equipment?: string[];
  campaignId?: string;
  entityType: EntityType;
}

export enum PlanType {
  exploration = "exploration",
  encounter = "encounter",
}

export interface IPlan {
  id: string;
  planType: PlanType;
  campaignId?: string;
  entities: IEntity[];
}