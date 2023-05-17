export enum PathType {
  exploration = "exploration",
  encounter = "encounter",
}

export interface PartialPath {
  type: PathType;
  // Array of entity Ids
  entities: string[];
  orderNum?: number;
  id?: string;
  campaignId?: string;
}

export interface IPath extends PartialPath {
  id: string;
  campaignId: string;
}

export interface IRawPath extends Omit<IPath, "entities"> {
  entities?: string;
}
