export interface PartialNote {
  title: string;
  body: string;
  id?: number;
  campaignId?: number;
  createDate?: string;
  modifiedDate?: string;
  entityId?: number;
}

export interface INote extends PartialNote {
  id: number;
  campaignId: number;
  createDate: string;
  modifiedDate?: string;
}
