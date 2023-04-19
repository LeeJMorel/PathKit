import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Import the necessary CSS and component files
import styles from "./App.module.scss";
import SheetView from "./SheetView";
import CardView from "./CardView";
import ModuleView from "./ModuleView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainMenu from "./components/menus/MainMenu";

// Load FontAwesome icons
library.add(fas);

//this is a placeholder until the store is set up
export interface ObjectProps {
  title: string;
  description: string;
  name: string;
  data: {
    field1: string;
    field2: string;
    field3: string;
  };
}

export enum AppMode {
  exploration = "exploration",
  encounter = "encounter",
}

function App() {
  // Define the props for the Header component
  const [mode, setMode] = useState<AppMode>(AppMode.exploration);
  const [menu, setMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const searchResults =
    // Placeholder entity info data
    {
      title: "Search Sheet",
      description: "This is a placeholder search sheet",
      name: "Search Name",
      data: {
        field1: "Value 1",
        field2: "Value 2",
        field3: "Value 3",
      },
    };
  // Replace with your actual search results data

  const customFeatures = "DCModule,DiceModule"; // Replace with your actual custom features data

  const entityInfo =
    // Placeholder entity info data
    {
      title: "Entity Sheet",
      description: "This is a placeholder entity sheet",
      name: "Entity Name",
      data: {
        field1: "Value 1",
        field2: "Value 2",
        field3: "Value 3",
      },
    };

  return (
    // Main container for the app
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerSection}>
          {/* Header over cards view, plus button pulls up plan menu*/}
          <button className={styles.headerButton}>
            <FontAwesomeIcon icon="plus" />
          </button>
          <h2 className={styles.headerTitle}>
            {mode.slice(0, 1).toUpperCase() + mode.slice(1)}
          </h2>
          {/* if in encounter mode, show a close button to exit it*/}
          {mode === AppMode.encounter ? (
            <button className={styles.headerButton}>
              <FontAwesomeIcon icon="close" />
            </button>
          ) : (
            // Empty div for layout
            <div className={styles.spacer} />
          )}
        </div>
        <div className={styles.headerSection}>
          {/* Header over sheets view, runs our search*/}
          <input
            type="text"
            placeholder={"Search"}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.headerSection}>
          <div className={styles.spacer}></div>
          {/* Header over module view, dynamic title with menu button*/}
          <h2 className={styles.headerTitle}>Modules</h2>
          {/* Hamburger menu icon */}
          <FontAwesomeIcon
            icon="bars"
            style={{ color: "#000", cursor: "pointer" }}
            onClick={handleToggleMenu}
          />
          {/* Render MainMenu component */}
          {menu && <MainMenu onClose={() => setMenu(false)} />}
        </div>
      </header>
      <main className={styles.content}>
        {/* Content component for the first column holds planner 
            which then tells the header what mode we are in. */}
        <CardView></CardView>
        {/* Content component for the second column will change if 
            header search component is used to show results*/}
        <SheetView
          selectedHeaderItem=""
          searchInfo={searchResults} // Pass search results as searchInfo
          entityInfo={entityInfo}
        ></SheetView>
        {/* Content component for the third column will change based on header values*/}
        <ModuleView visibleModules={customFeatures}></ModuleView>
      </main>
    </div>
  );
}

export default App;
