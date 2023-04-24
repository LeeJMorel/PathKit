import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { ICampaign, IEntity, IPlan } from "../api/model";

interface IUseCampaigns {
  campaigns: ICampaign[];
  currentCampaignId: string | null;
  addCampaign: (campaign: ICampaign) => void;
  deleteCampaign: (campaignId: string) => void;
  loadCampaign: (campaignId: string) => void;
  unloadCampaign: () => void;
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

  // Tripwire to prevent infinite loop when call the useEffect below
  const [isCampaignSetup, setIsCampaignSetup] = useState<boolean>(false);

  useEffect(() => {
    if (currentCampaignId && !isCampaignSetup) {
      // Set the campaignId property for new entities and plans
      setEntities(
        entities.map((entity) =>
          entity.campaignId
            ? entity
            : {
                ...entity,
                campaignId: currentCampaignId,
              }
        )
      );
      setPlans(
        plans.map((plan) =>
          plan.campaignId
            ? plan
            : {
                ...plan,
                campaignId: currentCampaignId,
              }
        )
      );
      setIsCampaignSetup(true);
    } else if (!currentCampaignId && isCampaignSetup) {
      setIsCampaignSetup(false);
    }
  }, [
    currentCampaignId,
    entities,
    setEntities,
    plans,
    setPlans,
    isCampaignSetup,
  ]);

  const addCampaign = (newCampaign: ICampaign): void => {
    const campaign: ICampaign = {
      ...newCampaign,
      id: uuid(),
    };
    setCampaigns([...campaigns, campaign]);
  };

  const deleteCampaign = useCallback(
    (campaignId: string): void => {
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId));
      setEntities(
        entities.filter((entity) => entity.campaignId !== campaignId)
      );
      setPlans(plans.filter((plan) => plan.campaignId !== campaignId));
    },
    [campaigns, setCampaigns, entities, setEntities, plans, setPlans]
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
  };
};
