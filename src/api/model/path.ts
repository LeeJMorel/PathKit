export enum PathType {
  exploration = "exploration",
  encounter = "encounter",
}

export interface PartialPath {
  type: PathType;
  // Array of entity Ids
  entities: number[];
  orderNum?: number;
  id?: number;
  campaignId?: number;
}

export interface IPath extends PartialPath {
  id: number;
  campaignId: number;
}

export interface IRawPath extends Omit<IPath, "entities"> {
  entities?: string;
}
