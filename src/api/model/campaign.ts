export interface PartialCampaign {
  name: string;
  desc: string;
  id?: number;
}

export interface ICampaign extends PartialCampaign {
  id: number;
}
