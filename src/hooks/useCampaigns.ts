import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { ICampaign, IEntity, IPlan } from "../api/model";
import { insert } from "../api/database";

interface IUseCampaigns {
  campaigns: ICampaign[];
  currentCampaignId: string | number;
  addCampaign: (campaign: Omit<ICampaign, "campaignId">) => void;
  deleteCampaign: (campaignId: string | number) => void;
  loadCampaign: (campaignId: string | number) => Promise<void>;
  unloadCampaign: () => void;
  getCurrentCampaign: () => ICampaign | null;
  currentCampaign: ICampaign | null;
}

export const useCampaigns = (): IUseCampaigns => {
  const currentCampaignId = useStore((store) => store.currentCampaignId);
  const loadCampaign = useStore((store) => store.loadCampaign);
  const unloadCampaign = useStore((store) => store.unloadCampaign);
  const campaigns = useStore((store) => store.campaigns);
  const setCampaigns = useStore((store) => store.setCampaigns);
  const refreshCampaigns = useStore((store) => store.refreshCampaigns);
  const entities = useStore((store) => store.entities);
  const setEntities = useStore((store) => store.setEntities);
  const plans = useStore((store) => store.plans);
  const setPlans = useStore((store) => store.setPlans);
  const setPreferences = usePreferencesStore((store) => store.setPreferences);
  const [currentCampaign, setCurrentCampaign] = useState<ICampaign | null>(
    null
  );

  useEffect(() => {
    refreshCampaigns();
  }, []);

  const getCurrentCampaign = useCallback((): ICampaign | null => {
    const matches = campaigns.filter((e) => e.campaignId === currentCampaignId);
    if (matches.length) {
      return matches[0];
    }
    return null;
  }, [campaigns, currentCampaignId]);

  useEffect(() => {
    setCurrentCampaign(getCurrentCampaign());
  }, [currentCampaignId]);

  const addCampaign = async (
    newCampaign: Omit<ICampaign, "campaignId">
  ): Promise<void> => {
    // const campaign: ICampaign = {
    //   ...newCampaign,
    // };
    // setCampaigns([...campaigns, campaign]);
    const result = await insert("campaign", [newCampaign]);
    if (result) {
      loadCampaign(result.lastInsertId);
    }
    // refreshCampaigns();
    console.log("addCampaign", { result });
    // setPreferences({ currentCampaignId: id });
  };

  const deleteCampaign = useCallback(
    (campaignId: string | number): void => {
      if (campaignId === currentCampaignId) {
        unloadCampaign();
      }
      // DELETE campaign
      // setCampaigns(
      //   campaigns.filter((campaign) => campaign.campaignId !== campaignId)
      // );
      // setEntities(
      //   entities.filter((entity) => entity.campaignId !== campaignId)
      // );
      // setPlans(plans.filter((plan) => plan.campaignId !== campaignId));
      // setPreferences({ currentCampaignId: 0 });
    },
    [
      campaigns,
      setCampaigns,
      entities,
      setEntities,
      plans,
      setPlans,
      setPreferences,
    ]
  );

  return {
    campaigns,
    currentCampaignId,
    addCampaign,
    deleteCampaign,
    loadCampaign,
    unloadCampaign,
    getCurrentCampaign,
    currentCampaign,
  };
};
