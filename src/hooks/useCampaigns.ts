import { useState, useEffect, useCallback } from "react";
import { useStore } from "./useStore";
import { ICampaign } from "../api/model";
import useBoolean from "./useBoolean";

interface IUseCampaigns {
  campaigns: ICampaign[];
  currentCampaignId: number;
  addCampaign: (campaign: Omit<ICampaign, "id">) => void;
  deleteCampaign: (campaignId: number) => void;
  loadCampaign: (campaignId: number) => Promise<void>;
  unloadCampaign: () => void;
  getCurrentCampaign: () => Promise<ICampaign | undefined>;
  currentCampaign: ICampaign | undefined;
  refreshCampaigns: () => Promise<void>;
}

export const useCampaigns = (): IUseCampaigns => {
  const { value: mounted, setTrue: setMountedTrue } = useBoolean(false);
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
    if (!mounted && campaigns.length < 1) {
      refreshCampaigns();
      setMountedTrue();
    }
  }, [mounted, campaigns]);

  const getCurrentCampaign = useCallback(async (): Promise<
    ICampaign | undefined
  > => {
    await refreshCampaigns();
    return campaigns.find((e) => e.id === currentCampaignId);
  }, [campaigns, currentCampaignId]);

  useEffect(() => {
    (async () => {
      setCurrentCampaign(await getCurrentCampaign());
    })();
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
    refreshCampaigns,
  };
};
