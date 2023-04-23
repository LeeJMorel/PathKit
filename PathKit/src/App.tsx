import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Import the necessary CSS and component files
import styles from "./App.module.scss";
import SheetView from "./components/views/SheetView";
import CardView from "./components/views/CardView";
import ModuleView from "./components/views/ModuleView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainMenu from "./components/menus/MainMenu";
import PlannerMenu from "./components/menus/PlannerMenu";
import { IEntity } from "./api/model";
import EditPlannerMenu from "./components/menus/EditPlannerMenu";
import classNames from "classnames";
import { usePreferenceStore, useSelectEntity } from "./hooks";

// Load FontAwesome icons
library.add(fas);

export enum AppMode {
  exploration = "exploration",
  encounter = "encounter",
}

function App() {
  // Define the props for the Header component
  const [mode, setMode] = useState<AppMode>(AppMode.exploration);
  const [menu, setMenu] = useState(false);
  const [plannerMenu, setPlannerMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { preferences } = usePreferenceStore((store) => ({
    preferences: store.preferences,
  }));

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const handleTogglePlannerMenu = () => {
    setPlannerMenu(!plannerMenu);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    // Main container for the app
    <div
      className={classNames(
        styles.app,
        preferences.largeFont && styles.largeFont,
        styles[preferences.theme]
      )}
    >
      <header className={styles.header}>
        <div className={styles.headerSection}>
          {/* Header over cards view, button pulls up plan menu*/}
          <EditPlannerMenu />
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
            className={styles.searchBar}
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
        <SheetView></SheetView>
        {/* Content component for the third column will change based on header values*/}
        <ModuleView visibleModules={preferences.visibleModules}></ModuleView>
      </main>
    </div>
  );
}

export default App;
