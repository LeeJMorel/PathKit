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
  addPlan: (plan: PartialPlan) => IPlan;
  getPlanById: (planId?: string) => IPlan | undefined;
  deletePlan: (planId: string) => void;
  updatePlan: (plan: PartialPlan) => IPlan;
  updateOrAddPlan: (plan: PartialPlan) => IPlan;
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
    (newPlan: PartialPlan): IPlan => {
      const plan: IPlan = {
        ...newPlan,
        id: uuid(),
        campaignId: currentCampaignId, // TODO get campaignId from high level
      } as IPlan;

      setPlans([...plans, plan]);
      return plan;
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
    (newPlan: PartialPlan): IPlan => {
      let plan = newPlan;
      const newPlans: IPlan[] = plans.map((p) => {
        if (p.id === newPlan.id) {
          plan = Object.assign({}, p, plan);
          return plan as IPlan;
        }
        return p;
      });
      setPlans(newPlans);
      return plan as IPlan;
    },
    [plans]
  );

  const updateOrAddPlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      const planExists = getPlanById(newPlan.id);
      if (planExists) {
        return updatePlan(newPlan);
      }
      return addPlan(newPlan);
    },
    [plans]
  );

  return {
    plans: plans.filter((n) => n.campaignId === currentCampaignId),
    setPlans,
    addPlan,
    getPlanById,
    deletePlan,
    updatePlan,
    updateOrAddPlan,
  };
};
