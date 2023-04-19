import React from "react";
import styles from "./App.module.scss";

// Import the module components
import DCModule from "./components/modules/DCModule";
import DiceModule from "./components/modules/DiceModule";
import NotesModule from "./components/modules/NotesModule";

interface ModuleViewProps {
  visibleModules: string; // Update the type to accept a string
}

function ModuleView({ visibleModules }: ModuleViewProps) {
  // Create a mapping of module names to corresponding component references
  const moduleComponents: { [key: string]: React.FunctionComponent } = {
    DCModule,
    DiceModule,
    NotesModule,
    // Add more module components and their corresponding names as needed
  };

  // Render the corresponding module component based on the module names passed down
  const renderModules = (moduleNames: string) => {
    // Split the comma-separated string to get an array of module names
    const modules = moduleNames.split(",");

    // Render each module component in a div container
    return modules.map((moduleName) => {
      // Check if the module name is available in the mapping
      if (moduleComponents.hasOwnProperty(moduleName)) {
        const ModuleComponent = moduleComponents[moduleName];
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
    });
  };

  return (
    <div className={styles.moduleView}>{renderModules(visibleModules)}</div>
  );
}

export default ModuleView;
