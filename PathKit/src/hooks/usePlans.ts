import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { IPlan } from "../api/model";
import { usePreferencesStore } from "./usePreferencesStore";

interface IUsePlans {
  plans: IPlan[];
  setPlans: (plans: IPlan[]) => void;
  addPlan: (plan: Omit<IPlan, "id" | "campaignId">) => void;
  getPlanById: (planId?: string) => IPlan | undefined;
  deletePlan: (planId: string) => void;
}
export const usePlans = (): IUsePlans => {
  const { plans, setPlans, refreshPlans } = useStore((store) => ({
    plans: store.plans,
    setPlans: store.setPlans,
    refreshPlans: store.refreshPlans,
  }));
  const currentCampaignId = usePreferencesStore(
    (store) => store.preferences.currentCampaignId
  );

  // Initial call should refresh stored plans from API
  useEffect(() => {
    refreshPlans();
  }, []);

  const addPlan = useCallback(
    (newPlan: Omit<IPlan, "id" | "campaignId">): void => {
      const plan: IPlan = {
        ...newPlan,
        id: uuid(),
        campaignId: currentCampaignId, // TODO get campaignId from high level
      } as IPlan;

      return setPlans([...plans, plan]);
    },
    [plans, currentCampaignId]
  );

  const getPlanById = useCallback(
    (planId?: string): IPlan | undefined => {
      const matches = plans.filter((p) => p.id === planId);
      if (matches.length) {
        return matches[0];
      }
    },
    [plans]
  );

  const deletePlan = useCallback(
    (planId: string): void => {
      return setPlans(plans.filter((p) => p.id !== planId));
    },
    [plans]
  );

  return {
    plans,
    setPlans,
    addPlan,
    getPlanById,
    deletePlan,
  };
};
