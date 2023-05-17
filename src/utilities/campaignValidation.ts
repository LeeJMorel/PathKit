import { useCampaigns } from "../hooks/useCampaigns";

export const tutorialCampaignId = (): boolean => {
  const { currentCampaignId } = useCampaigns();

  const tutorialId = 1; // Replace with the ID you want to compare with currentCampaignId

  return currentCampaignId === tutorialId;
};
