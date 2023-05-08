export enum PlanType {
  exploration = "exploration",
  encounter = "encounter",
}

export interface PartialPlan {
  type: PlanType;
  // Array of entity Ids
  entities: number[];
  orderNum?: number;
  id?: number;
  campaignId?: number;
}

export interface IPlan extends PartialPlan {
  id: number;
  campaignId: number;
}

export interface IRawPlan extends Omit<IPlan, "entities"> {
  entities?: string;
}
