import { useEffect, useState } from "react";
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
import { IEntity, IPlan } from "./api/model";
import EditPlannerMenu from "./components/menus/EditPlannerMenu";
import classNames from "classnames";
import { usePreferencesStore, useCampaigns, usePlans } from "./hooks";
import TipMenu from "./components/menus/TipMenu";
import { WelcomeMenu } from "./components/menus/WelcomeMenu";
import { RoundButton } from "./components/buttons";

// Load FontAwesome icons
library.add(fas);

export enum AppMode {
  exploration = "exploration",
  encounter = "encounter",
}

function App() {
  //control at a high level the campaign that we load
  const { currentCampaignId, deleteCampaign, unloadCampaign } = useCampaigns();
  const handleDeleteCampaign = (campaignId: string) => {
    deleteCampaign(campaignId);
    // Also reset the current campaign if it is the one being deleted
    if (currentCampaignId === campaignId) {
      unloadCampaign();
    }
  };
  // Define the props for the Header component
  const [mode, setMode] = useState<AppMode>(AppMode.exploration);
  const [menu, setMenu] = useState(false);
  const [plannerMenu, setPlannerMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { preferences, setPreferences } = usePreferencesStore();

  //generate the header section based on if a plan is selected
  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(undefined);
  useEffect(
    () => setCurrentPlan(getPlanById(preferences.selectedPlan || undefined)),
    [preferences.selectedPlan, getPlanById]
  );

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const handleTogglePlannerMenu = () => {
    setPlannerMenu(!plannerMenu);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSearch = event.target.value;
    const selectedEntity = null;
    setPreferences({
      ...preferences,
      selectedSearch,
      selectedEntity,
    });
  };

  const cancelPlan = () => {
    const selectedPlan = null;
    setPreferences({
      ...preferences,
      selectedPlan,
    });
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
      {!currentCampaignId && <WelcomeMenu />}
      <header className={styles.header}>
        <div className={styles.headerSection}>
          {/* Header over cards view, button pulls up plan menu*/}
          <EditPlannerMenu />
          {/* if in encounter mode, show a close button to exit it*/}
          {preferences.selectedPlan != undefined ? (
            <>
              <h2 className={styles.headerTitle}>
                {/*capitalize the Header Title*/}
                {currentPlan?.planType &&
                  currentPlan.planType.charAt(0).toUpperCase() +
                    currentPlan.planType.slice(1)}
              </h2>
              <RoundButton className={styles.headerButton} onClick={cancelPlan}>
                <FontAwesomeIcon icon="close" />
              </RoundButton>
            </>
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
            className={styles.hamburgerMenu}
            onClick={handleToggleMenu}
          />
          {/* Render MainMenu component */}
          {menu && <MainMenu onClose={() => setMenu(false)} />}
        </div>
      </header>
      <main className={styles.content}>
        {/* Content component for the first column holds planner 
            which then tells the header what mode we are in. */}
        <CardView />
        {/* Content component for the second column will change if 
            header search component is used to show results*/}
        <SheetView />
        {/* Content component for the third column will change based on header values*/}
        <ModuleView />
      </main>
    </div>
  );
}

export default App;
