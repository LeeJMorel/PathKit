import { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { IPath } from "../api/model";
import { PartialBy } from "../utilities";
import useBoolean from "./useBoolean";
import { PartialPath } from "../api/model";

// export type PartialPath = PartialBy<IPath, "id" | "campaignId">;

interface IUsePaths {
  paths: IPath[];
  getPathById: (pathId?: string | number) => IPath | undefined;
  deletePath: (pathId: string) => void;
  updateOrAddPath: (path: PartialPath) => Promise<IPath | undefined>;
}
export const usePaths = (): IUsePaths => {
  const { value: mounted, setTrue: setMountedTrue } = useBoolean(false);
  const { paths, refreshPaths, insertPath, deletePathFromDb } = useStore(
    (store) => ({
      paths: store.paths,
      refreshPaths: store.refreshPaths,
      insertPath: store.insertPath,
      deletePathFromDb: store.deletePath,
    })
  );
  const { preferences, setPreferences } = usePreferencesStore();

  // Initial call should refresh stored paths from API
  useEffect(() => {
    if (!mounted && paths.length < 1) {
      refreshPaths();
      setMountedTrue();
    }
  }, [mounted, paths]);

  const debouncedUpdateOrAdd = debounce(async (newPath: PartialPath) => {
    return await insertPath(newPath);
  }, 1000);

  const updateOrAddPath = async (
    newPath: PartialPath
  ): Promise<IPath | undefined> => {
    return debouncedUpdateOrAdd(newPath);
  };

  const getPathById = useCallback(
    (pathId?: string | number): IPath | undefined => {
      return paths.find((p) => p.id === pathId);
    },
    [paths]
  );

  const deletePath = useCallback(
    (id: string): void => {
      deletePathFromDb(id);
      if (id === preferences.selectedPath) {
        setPreferences({
          selectedPath: "",
        });
      }
    },
    [preferences]
  );

  return {
    paths,
    getPathById,
    deletePath,
    updateOrAddPath,
  };
};
