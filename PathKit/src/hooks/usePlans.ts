import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { IPlan } from "../api/model";

interface IUsePlans {
  plans: IPlan[];
  setPlans: (plans: IPlan[]) => void;
  addPlan: (plan: Partial<IPlan>) => void;
  getPlanById: (planId?: string) => IPlan | undefined;
  deletePlan: (planId: string) => void;
}
export const usePlans = (): IUsePlans => {
  const { plans, setPlans, refreshPlans } = useStore((store) => ({
    plans: store.plans,
    setPlans: store.setPlans,
    refreshPlans: store.refreshPlans,
  }));

  // Initial call should refresh stored plans from API
  useEffect(() => {
    refreshPlans();
  }, []);

  const addPlan = (newPlan: Partial<IPlan>): void => {
    const plan: IPlan = {
      ...newPlan,
      id: newPlan.id || uuid(),
      campaignId: "000", // TODO get campaignId from high level
    } as IPlan;

    return setPlans([...plans, plan]);
  };

  const getPlanById = (planId?: string): IPlan | undefined => {
    const matches = plans.filter((p) => p.id === planId);
    if (matches.length) {
      return matches[0];
    }
  };

  const deletePlan = (planId: string): void => {
    return setPlans(plans.filter((p) => p.id !== planId));
  };

  return {
    plans,
    setPlans,
    addPlan,
    getPlanById,
    deletePlan,
  };
};
