import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { ICampaign, IEntity, IPlan } from "../api/model";
import { insertRow } from "../api/database";

interface IUseCampaigns {
  campaigns: ICampaign[];
  currentCampaignId: number;
  addCampaign: (campaign: Omit<ICampaign, "id">) => void;
  deleteCampaign: (campaignId: number) => void;
  loadCampaign: (campaignId: number) => Promise<void>;
  unloadCampaign: () => void;
  getCurrentCampaign: () => ICampaign | undefined;
  currentCampaign: ICampaign | undefined;
}

export const useCampaigns = (): IUseCampaigns => {
  const currentCampaignId = useStore((store) => store.currentCampaignId);
  const loadCampaign = useStore((store) => store.loadCampaign);
  const unloadCampaign = useStore((store) => store.unloadCampaign);
  const insertCampaign = useStore((store) => store.insertCampaign);
  const deleteCampaign = useStore((store) => store.deleteCampaign);
  const campaigns = useStore((store) => store.campaigns);
  const refreshCampaigns = useStore((store) => store.refreshCampaigns);
  const [currentCampaign, setCurrentCampaign] = useState<
    ICampaign | undefined
  >();

  useEffect(() => {
    refreshCampaigns();
  }, []);

  const getCurrentCampaign = useCallback((): ICampaign | undefined => {
    return campaigns.find((e) => e.id === currentCampaignId);
  }, [campaigns, currentCampaignId]);

  useEffect(() => {
    setCurrentCampaign(getCurrentCampaign());
  }, [currentCampaignId]);

  const addCampaign = async (
    newCampaign: Omit<ICampaign, "id">
  ): Promise<void> => {
    const result = await insertCampaign(newCampaign);
    if (result) {
      loadCampaign(result.id);
    }
    console.log("addCampaign", { result });
  };

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
