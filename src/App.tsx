import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Import the necessary CSS and component files
import styles from "./App.module.scss";
import SheetView from "./components/views/SheetView";
import CardView from "./components/views/CardView";
import ModuleView from "./components/views/ModuleView";
import MainMenu from "./components/menus/MainMenu";
import { IPath } from "./api/model";
import classNames from "classnames";
import {
  usePreferencesStore,
  useCampaigns,
  usePaths,
  useEntities,
  useBoolean,
} from "./hooks";
import { WelcomeMenu } from "./components/menus/WelcomeMenu";
import { RoundButton } from "./components/buttons";
import { InitiativeMenu } from "./components/menus/InitiativeMenu";
import Search from "./components/search/Search";
import EntitySheet from "./components/sheets/EntitySheet";
import EditEntitySheet from "./components/sheets/EditEntitySheet";
import NotesSheet from "./components/sheets/NotesSheet";
import CreationDropdown from "./components/dropdowns/CreationDropdown";
import EditPathSheet from "./components/sheets/EditPathSheet";
import { initializeDatabase } from "./api/database";
import LicenseSheet from "./components/sheets/LicenseSheet";

// Load FontAwesome icons
library.add(fas);

export enum AppMode {
  exploration = "exploration",
  encounter = "encounter",
}

function App() {
  console.log(useLocation());
  useEffect(() => {
    // Initialize database on first load
    const asyncInit = async () => await initializeDatabase();
    asyncInit();
  }, []);
  //control at a high level the campaign that we load
  const { currentCampaignId } = useCampaigns();

  // Define the props for the Header component
  const [mode, setMode] = useState<AppMode>(AppMode.exploration);
  const [menu, setMenu] = useState(false);
  const { value: createDropdown, toggle: toggleCreateDropdown } =
    useBoolean(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { preferences, setPreferences } = usePreferencesStore();

  //generate the header section based on if a path is selected
  const { getPathById } = usePaths();
  const [currentPath, setCurrentPath] = useState<IPath | undefined>(undefined);
  useEffect(
    () => setCurrentPath(getPathById(preferences.selectedPath || undefined)),
    [preferences.selectedPath, getPathById]
  );

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const handleToggleCreate = () => {
    toggleCreateDropdown();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSearch = event.target.value;
    setPreferences({
      ...preferences,
      selectedSearch,
    });
  };

  const { resetInitiative } = useEntities();
  const cancelPath = () => {
    const selectedPath = "";
    setPreferences({
      ...preferences,
      selectedPath,
    });
    resetInitiative();
  };

  //open and close initiative menu
  const [showInitiativeMenu, setShowInitiativeMenu] = useState(false);
  useEffect(() => {
    if (
      preferences.selectedPath !== undefined &&
      currentPath?.type === "encounter"
    ) {
      setShowInitiativeMenu(true);
    }
  }, [preferences.selectedPath, currentPath]);
  const handleInitiativeMenu = () => {
    setShowInitiativeMenu((prevState) => !prevState);
  };

  useEffect(() => {
    switch (preferences.theme) {
      case "dark":
      case "highContrastDark":
        document.documentElement.setAttribute("data-color-mode", "dark");
        break;
      case "parchment":
      case "highContrastParchment":
      default:
        document.documentElement.setAttribute("data-color-mode", "light");
        break;
    }
  }, [preferences.theme]);

  return (
    // Main container for the app
    <div
      className={classNames(
        styles.app,
        preferences.largeFont && styles.largeFont,
        styles[preferences.theme]
      )}
    >
      {!currentCampaignId && <WelcomeMenu />}
      <header className={styles.header}>
        <div className={styles.headerSection}>
          {/* Header over cards view, button pulls up create menu*/}
          <RoundButton icon="file-circle-plus" onClick={handleToggleCreate} />
          {/* Render MainMenu component */}
          {/* <div className={styles.dropdown}> */}
          <CreationDropdown
            isOpen={createDropdown}
            onClose={handleToggleCreate}
          ></CreationDropdown>
          {/* </div> */}
          {/* <PathPlannerDropdown onClose={() => setCreateDropdown(false)} /> */}
          {/* if in encounter mode, show a close button to exit it*/}
          {preferences.selectedPath !== "" ? (
            <>
              {showInitiativeMenu && currentPath?.type === "encounter" && (
                <InitiativeMenu onClose={handleInitiativeMenu} />
              )}
              <h2 className={styles.headerTitle}>
                {/*capitalize the Header Title*/}
                {currentPath?.type &&
                  currentPath.type.charAt(0).toUpperCase() +
                    currentPath.type.slice(1)}
              </h2>
              <RoundButton icon="close" onClick={cancelPath} />
            </>
          ) : (
            // Empty div for layout
            <div className={styles.spacer} />
          )}
        </div>
        <div className={styles.headerSection}>
          {/* Header over sheets view, runs our search*/}
          {/* When you want to use meilisearch use this component instead of the input below
          <Search></Search> */}
          {/* <input
            className={styles.searchBar}
            type="text"
            placeholder={"Search"}
            value={searchTerm}
            onChange={handleSearch}
          /> */}
        </div>
        <div className={styles.headerSection}>
          <div className={styles.spacer}></div>
          {/* Header over module view, dynamic title with menu button*/}
          <h2 className={styles.headerTitle}>Modules</h2>
          {/* Hamburger menu icon */}
          <RoundButton icon="bars" onClick={handleToggleMenu} />
          {/* Render MainMenu component */}
          {menu && <MainMenu onClose={() => setMenu(false)} />}
        </div>
      </header>
      <main className={styles.content}>
        {/* Content component for the first column holds PathPlanner
            which then tells the header what mode we are in. */}
        <CardView />
        {/* Content component for the second column will change if
            header search component is used to show results*/}
        <Routes>
          <Route path="/" element={<SheetView />}>
            <Route index element={<NotesSheet />} />
            <Route path="entity/:entityId" element={<EntitySheet />} />
            <Route path="entity/:entityId/edit" element={<EditEntitySheet />} />
            <Route path="path/:pathId/*" element={<EditPathSheet />}>
              {/* <Route path=":entityId/edit" element={<EditEntitySheet />} /> */}
            </Route>
            <Route path="license" element={<LicenseSheet />} />
            <Route path="*" element={<NotesSheet />} />
          </Route>
        </Routes>
        {/* Content component for the third column will change based on header values*/}
        <ModuleView />
      </main>
    </div>
  );
}

export default App;
