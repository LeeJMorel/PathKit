import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { IPlan } from "../api/model";
import { usePreferencesStore } from "./usePreferencesStore";
import { PartialBy } from "../utilities";

export type PartialPlan = PartialBy<IPlan, "id" | "campaignId">;

interface IUsePlans {
  plans: IPlan[];
  setPlans: (plans: IPlan[]) => void;
  addPlan: (plan: PartialPlan) => void;
  getPlanById: (planId?: string) => IPlan | undefined;
  deletePlan: (planId: string) => void;
  updatePlan: (plan: PartialPlan) => void;
  updateOrAddPlan: (plan: PartialPlan) => void;
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
    (newPlan: PartialPlan): void => {
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

  const updatePlan = useCallback(
    (newPlan: PartialPlan): void => {
      const newPlans: IPlan[] = plans.map((plan) =>
        plan.id === newPlan.id ? Object.assign({}, plan, newPlan) : plan
      );
      setPlans(newPlans);
    },
    [plans]
  );

  const updateOrAddPlan = useCallback(
    (newPlan: PartialPlan): void => {
      const planExists = getPlanById(newPlan.id);
      if (planExists) {
        return updatePlan(newPlan);
      }
      return addPlan(newPlan);
    },
    [plans]
  );

  return {
    plans,
    setPlans,
    addPlan,
    getPlanById,
    deletePlan,
    updatePlan,
    updateOrAddPlan,
  };
};
