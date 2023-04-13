import React from "react";
import "./App.css";

// Import the module components
import DCModule from "./components/right/DCModule";
import DiceModule from "./components/right/DiceModule";
import NotesModule from "./components/right/NotesModule";

interface RightProps {
  visibleModules: string; // Update the type to accept a string
}

function Right({ visibleModules }: RightProps) {
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
          <div key={moduleName} className="RightModule">
            <ModuleComponent />
          </div>
        );
      } else {
        // Render a default message or fallback UI if module name is not available
        return (
          <div key={moduleName} className="RightModule">
            No module found for {moduleName}
          </div>
        );
      }
    });
  };

  return <div className="Right">{renderModules(visibleModules)}</div>;
}

export default Right;
