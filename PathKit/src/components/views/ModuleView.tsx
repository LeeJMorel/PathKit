import React from "react";
import styles from "./View.module.scss";

// Import the module components
// import DCModule from "../modules/DCModule";
// import DiceModule from "../modules/DiceModule";
// import NotesModule from "../modules/NotesModule";
// import { Module } from "../../api/model";
import { Modules, Module } from "../modules";
import { usePreferencesStore } from "../../hooks";

function ModuleView() {
  const { visibleModules } = usePreferencesStore((store) => store.preferences);

  // Render the corresponding module component based on the module names passed down
  const renderModules = () => {
    // Render each module component in a div container
    if (Object.values(visibleModules).every((visible) => !visible)) {
      return <h3>No modules selected.</h3>;
    }
    return Object.entries(visibleModules).map(([moduleName, moduleVisible]) => {
      // Check if the module name is available in the mapping
      if (moduleVisible) {
        const { ModuleComponent } = Modules[moduleName as Module];
        if (ModuleComponent) {
          return (
            <div key={moduleName} className={styles.moduleViewObject}>
              <ModuleComponent />
            </div>
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
