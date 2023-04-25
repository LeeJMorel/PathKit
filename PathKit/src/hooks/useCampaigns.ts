import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { ICampaign, IEntity, IPlan } from "../api/model";

interface IUseCampaigns {
  campaigns: ICampaign[];
  currentCampaignId: string | null;
  addCampaign: (campaign: Omit<ICampaign, "id">) => void;
  deleteCampaign: (campaignId: string) => void;
  loadCampaign: (campaignId: string) => void;
  unloadCampaign: () => void;
  getCurrentCampaign: () => ICampaign | null;
  currentCampaign: ICampaign | null;
}

export const useCampaigns = (): IUseCampaigns => {
  const campaigns = useStore((store) => store.campaigns);
  const setCampaigns = useStore((store) => store.setCampaigns);
  const refreshCampaigns = useStore((store) => store.refreshCampaigns);
  const entities = useStore((store) => store.entities);
  const setEntities = useStore((store) => store.setEntities);
  const plans = useStore((store) => store.plans);
  const setPlans = useStore((store) => store.setPlans);
  const { currentCampaignId } = usePreferencesStore(
    (store) => store.preferences
  );
  const setPreferences = usePreferencesStore((store) => store.setPreferences);
  const [currentCampaign, setCurrentCampaign] = useState<ICampaign | null>(
    null
  );

  useEffect(() => {
    refreshCampaigns();
  }, []);

  const getCurrentCampaign = useCallback((): ICampaign | null => {
    const matches = campaigns.filter((e) => e.id === currentCampaignId);
    if (matches.length) {
      return matches[0];
    }
    return null;
  }, [campaigns, currentCampaignId]);

  useEffect(() => {
    setCurrentCampaign(getCurrentCampaign());
  }, [currentCampaignId]);

  const addCampaign = (newCampaign: Omit<ICampaign, "id">): void => {
    const id = uuid();
    const campaign: ICampaign = {
      ...newCampaign,
      id,
    };
    setCampaigns([...campaigns, campaign]);
    setPreferences({ currentCampaignId: id });
  };

  const deleteCampaign = useCallback(
    (campaignId: string): void => {
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId));
      setEntities(
        entities.filter((entity) => entity.campaignId !== campaignId)
      );
      setPlans(plans.filter((plan) => plan.campaignId !== campaignId));
      setPreferences({ currentCampaignId: null });
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

  const loadCampaign = useCallback(
    (campaignId: string): void => {
      // setCurrentCampaignId(campaignId);
      setPreferences({ currentCampaignId: campaignId });
    },
    [setPreferences]
  );

  const unloadCampaign = useCallback((): void => {
    setPreferences({ currentCampaignId: null });
  }, [setPreferences]);

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
