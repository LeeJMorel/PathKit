import React, { useCallback } from "react";
import { useStore } from "./useStore";
import {
  ICampaign,
  PartialEntity,
  PartialNote,
  PartialPath,
} from "../api/model";

export interface IUseMigrate {
  importCampaignFromJSON: (jsonString: string) => void;
  exportCampaignToJSON: (id?: number) => void;
}

const REPLACE_STRING = "{{REPLACE_ME}}";

export const useMigrate = () => {
  const {
    campaigns,
    currentCampaignId,
    entities,
    paths,
    notes,
    insertCampaign,
    insertEntity,
    insertNote,
    insertPath,
  } = useStore();

  const importCampaignFromJSON = useCallback(
    async (jsonString: string): Promise<ICampaign | undefined> => {
      const data = JSON.parse(jsonString);
      const { campaign, entities, notes, paths } = data;
      const importedCampaign = await insertCampaign(campaign);
      const campaignId = importedCampaign?.id;
      if (campaignId) {
        entities.forEach(async (entity: PartialEntity) =>
          insertEntity(entity, campaignId, true)
        );
        notes.forEach((note: PartialNote) =>
          insertNote(note, campaignId, true)
        );
        paths.forEach((path: PartialPath) =>
          insertPath(path, campaignId, true)
        );
      }
      return importedCampaign;
    },
    []
  );

  const exportCampaignToJSON = useCallback(
    (campaignId: string = currentCampaignId) => {
      const campaign = campaigns.find((c) => c.id === campaignId);
      if (campaign) {
        const dataToExport = {
          campaign,
          entities,
          notes,
          paths,
        };
        const dataStr =
          "data:text/json;charset=utf8," +
          encodeURIComponent(JSON.stringify(dataToExport));
        var dlAnchorElem = document.createElement("a");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute(
          "download",
          `pathkit-campaign-${campaign.name}.json`
        );
        dlAnchorElem.click();
      }
    },
    [campaigns, currentCampaignId, entities, paths, notes]
  );
  return {
    importCampaignFromJSON,
    exportCampaignToJSON,
  };
};

export default useMigrate;
