import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { IPlan } from "../api/model";
import { usePreferencesStore } from "./usePreferencesStore";
import { PartialBy } from "../utilities";

export type PartialPlan = PartialBy<IPlan, "id" | "campaignId">;

interface IUsePlans {
  plans: IPlan[];
  addPlan: (plan: PartialPlan) => IPlan;
  getPlanById: (planId?: string | number) => IPlan | undefined;
  deletePlan: (planId: number) => void;
  updatePlan: (plan: PartialPlan) => IPlan;
  updateOrAddPlan: (plan: PartialPlan) => IPlan;
}
export const usePlans = (): IUsePlans => {
  const { plans, refreshPlans, currentCampaignId } = useStore((store) => ({
    plans: store.plans,
    refreshPlans: store.refreshPlans,
    currentCampaignId: store.currentCampaignId,
  }));

  // Initial call should refresh stored plans from API
  useEffect(() => {
    refreshPlans();
  }, []);

  const addPlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      // const plan: IPlan = {
      //   ...newPlan,
      //   planId: uuid(),
      //   campaignId: currentCampaignId, // TODO get campaignId from high level
      // } as IPlan;

      // setPlans([...plans, plan]);
      // return plan;
      return {} as IPlan;
    },
    [plans, currentCampaignId]
  );

  const getPlanById = useCallback(
    (planId?: string | number): IPlan | undefined => {
      // const matches = plans.filter((p) => p.planId === planId);
      // if (matches.length) {
      //   return matches[0];
      // }
      return undefined;
    },
    [plans]
  );

  const deletePlan = useCallback(
    async (planId: number): Promise<void> => {
      // return await setPlans(plans.filter((p) => p.planId !== planId));
    },
    [plans]
  );

  const updatePlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      // let plan = newPlan;
      // const newPlans: IPlan[] = plans.map((p) => {
      //   if (p.planId === newPlan.planId) {
      //     plan = Object.assign({}, p, plan);
      //     return plan as IPlan;
      //   }
      //   return p;
      // });
      // setPlans(newPlans);
      // return plan as IPlan;
      return {} as IPlan;
    },
    [plans]
  );

  const updateOrAddPlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      // const planExists = getPlanById(newPlan.planId);
      // if (planExists) {
      //   return updatePlan(newPlan);
      // }
      // return addPlan(newPlan);
      return {} as IPlan;
    },
    [plans]
  );

  return {
    // plans: plans.filter((n) => n.campaignId === currentCampaignId),
    plans,
    addPlan,
    getPlanById,
    deletePlan,
    updatePlan,
    updateOrAddPlan,
  };
};
