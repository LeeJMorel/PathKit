import { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { IPlan } from "../api/model";
import { PartialBy } from "../utilities";
import useBoolean from "./useBoolean";

export type PartialPlan = PartialBy<IPlan, "id" | "campaignId">;

interface IUsePlans {
  plans: IPlan[];
  getPlanById: (planId?: string | number) => IPlan | undefined;
  deletePlan: (planId: number) => void;
  updateOrAddPlan: (plan: PartialPlan) => Promise<IPlan | undefined>;
}
export const usePlans = (): IUsePlans => {
  const { value: mounted, setTrue: setMountedTrue } = useBoolean(false);
  const { plans, refreshPlans, insertPlan, deletePlanFromDb } = useStore(
    (store) => ({
      plans: store.plans,
      refreshPlans: store.refreshPlans,
      insertPlan: store.insertPlan,
      deletePlanFromDb: store.deletePlan,
    })
  );
  const { preferences, setPreferences } = usePreferencesStore();

  // Initial call should refresh stored plans from API
  useEffect(() => {
    if (!mounted && plans.length < 1) {
      refreshPlans();
      setMountedTrue();
    }
  }, [mounted, plans]);

  const debouncedUpdateOrAdd = debounce(async (newPlan: PartialPlan) => {
    return await insertPlan(newPlan);
  }, 500);

  const updateOrAddPlan = async (
    newPlan: PartialPlan
  ): Promise<IPlan | undefined> => {
    return debouncedUpdateOrAdd(newPlan);
  };

  const getPlanById = useCallback(
    (planId?: string | number): IPlan | undefined => {
      return plans.find((p) => p.id === planId);
    },
    [plans]
  );

  const deletePlan = useCallback(
    (id: number): void => {
      deletePlanFromDb(id);
      if (id === preferences.selectedPlan) {
        setPreferences({
          selectedPlan: 0,
        });
      }
    },
    [preferences]
  );

  return {
    plans,
    getPlanById,
    deletePlan,
    updateOrAddPlan,
  };
};
