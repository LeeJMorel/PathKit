import React from "react";
import { Modules, Module } from "../modules";
import { usePreferencesStore } from "../../hooks";
import styles from "./View.module.scss";
import CollapsibleHeader from "../headers/CollapsibleHeader";

function ModuleView() {
  const { preferences, setPreferences } = usePreferencesStore();
  const { visibleModules, collapsedModules } = preferences;

  // Render the corresponding module component based on the module names passed down
  const renderModules = () => {
    // Render each module component in a div container
    if (Object.values(visibleModules).every((visible) => !visible)) {
      return (
        <div className={styles.moduleViewEmpty}>
          <h3>
            No modules selected. You can enable or disable modules in the menu
            under "View".
          </h3>
        </div>
      );
    }
    return Object.entries(visibleModules).map(([moduleName, moduleVisible]) => {
      // Check if the module name is available in the mapping
      if (moduleVisible) {
        const { ModuleComponent, label, collapsible } =
          Modules[moduleName as Module];
        if (ModuleComponent) {
          return (
            <CollapsibleHeader
              title={label}
              key={moduleName}
              className={styles.moduleViewObject}
              toggle={collapsible}
              defaultCollapsed={collapsedModules[moduleName as Module]}
              onCollapsed={(collapsed) =>
                setPreferences({
                  collapsedModules: {
                    ...collapsedModules,
                    [moduleName]: collapsed,
                  },
                })
              }
              onRemove={() =>
                setPreferences({
                  visibleModules: { ...visibleModules, [moduleName]: false },
                })
              }
            >
              <ModuleComponent />
            </CollapsibleHeader>
          );
        } else {
          // Render a default message or fallback UI if module name is not available
          return (
            <div key={moduleName} className={styles.moduleViewObject}>
              No module found for {moduleName}
            </div>
          );
        }
      }
    });
  };

  return <div className={styles.moduleView}>{renderModules()}</div>;
}

export default ModuleView;
