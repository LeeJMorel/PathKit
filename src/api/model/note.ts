export interface PartialNote {
  title: string;
  body: string;
  id?: string;
  campaignId?: string;
  createDate?: string;
  modifiedDate?: string;
  entityId?: string;
}

export interface INote extends PartialNote {
  id: string;
  campaignId: string;
  createDate: string;
  modifiedDate?: string;
}
