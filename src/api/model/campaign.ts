export interface PartialCampaign {
  name: string;
  desc: string;
  id?: string;
}

export interface ICampaign extends PartialCampaign {
  id: string;
}
