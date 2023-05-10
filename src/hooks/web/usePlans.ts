// import { useEffect, useCallback } from "react";
// import { v4 as uuid } from "uuid";
// import { useStore } from "./useStore";
// import { IPath } from "../api/model";
// import { usePreferencesStore } from "./usePreferencesStore";
// import { PartialBy } from "../utilities";

// export type PartialPlan = PartialBy<IPath, "id" | "campaignId">;

// interface IusePaths {
//   plans: IPath[];
//   setPaths: (plans: IPath[]) => void;
//   addPlan: (path: PartialPlan) => IPath;
//   getPathById: (pathId?: string) => IPath | undefined;
//   deletePath: (pathId: string) => void;
//   updatePlan: (path: PartialPlan) => IPath;
//   updateOrAddPath: (path: PartialPlan) => IPath;
// }
// export const usePaths = (): IusePaths => {
//   const { plans, setPaths, refreshPlans } = useStore((store) => ({
//     plans: store.paths,
//     setPaths: store.setPaths,
//     refreshPlans: store.refreshPlans,
//   }));
//   const currentCampaignId = usePreferencesStore(
//     (store) => store.preferences.currentCampaignId
//   );

//   // Initial call should refresh stored plans from API
//   useEffect(() => {
//     refreshPlans();
//   }, []);

//   const addPlan = useCallback(
//     (newPath: PartialPlan): IPath => {
//       const path: IPath = {
//         ...newPath,
export {};

//         id: uuid(),
//         campaignId: currentCampaignId, // TODO get campaignId from high level
//       } as IPath;

//       setPaths([...plans, path]);
//       return path;
//     },
//     [plans, currentCampaignId]
//   );

//   const getPathById = useCallback(
//     (pathId?: string): IPath | undefined => {
//       const matches = plans.filter((p) => p.id === pathId);
//       if (matches.length) {
//         return matches[0];
//       }
//     },
//     [plans]
//   );

//   const deletePath = useCallback(
//     (pathId: string): void => {
//       return setPaths(plans.filter((p) => p.id !== pathId));
//     },
//     [plans]
//   );

//   const updatePlan = useCallback(
//     (newPath: PartialPlan): IPath => {
//       let path = newPath;
//       const newPaths: IPath[] = plans.map((p) => {
//         if (p.id === newPath.id) {
//           path = Object.assign({}, p, path);
//           return path as IPath;
//         }
//         return p;
//       });
//       setPaths(newPaths);
//       return path as IPath;
//     },
//     [plans]
//   );

//   const updateOrAddPath = useCallback(
//     (newPath: PartialPlan): IPath => {
//       const planExists = getPathById(newPath.id);
//       if (planExists) {
//         return updatePlan(newPath);
//       }
//       return addPlan(newPath);
//     },
//     [plans]
//   );

//   return {
//     plans: plans.filter((n) => n.campaignId === currentCampaignId),
//     setPaths,
//     addPlan,
//     getPathById,
//     deletePath,
//     updatePlan,
//     updateOrAddPath,
//   };
// };
