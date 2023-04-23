import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import PlannerMenu from "./PlannerMenu";
import { AppMode } from "../../App";
import { IEntity } from "../../api/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IMenuProps {
  appMode: AppMode;
  planId?: string;
}

const EditPlannerMenu: React.FC<IMenuProps> = ({
  appMode,
  planId,
}: IMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(
    appMode === AppMode.encounter // set initial state value based on appMode prop
  );
  const [menuAppMode, setMenuAppMode] = useState<AppMode>(appMode);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCreateEncounterPlan = () => {
    setMenuAppMode(AppMode.encounter);
    setIsMenuOpen(true);
  };

  const handleCreateExplorationPlan = () => {
    setMenuAppMode(AppMode.exploration);
    setIsMenuOpen(true);
  };

  const handleEditPlan = () => {
    setIsMenuOpen(true);
  };

  const handleSave = (
    planName: string,
    entities: IEntity[],
    appMode: AppMode
  ) => {
    const plan = {
      name: planName,
      entities: entities,
      appMode: appMode,
    };
    // Do something with the plan data, such as saving it to a database
  };

  const renderMenu = () => {
    if (isMenuOpen) {
      return (
        <PlannerMenu
          onClose={handleCloseMenu}
          onSave={(entities, appMode) =>
            handleSave("Plan 1", entities, appMode)
          }
          planId={planId}
          appModeUsed={menuAppMode}
        />
      );
    }

    return (
      <div className={styles.menuRoundButtonContainer}>
        <div className={styles.menuDropdown}>
          <button
            type="button"
            title="Add Plan"
            className={styles.menuRoundButton}
            onClick={handleMenuClick}
          >
            <FontAwesomeIcon icon="file-circle-plus" />
          </button>
          <div className={styles.menuDropdownContent}>
            {planId && (
              <>
                <div
                  title="Create Encounter Plan"
                  onClick={handleCreateEncounterPlan}
                >
                  Create Encounter Plan
                </div>
                <div
                  title="Create Exploration Plan"
                  onClick={handleCreateExplorationPlan}
                >
                  Create Exploration Plan
                </div>
                <div title="Edit Current Plan" onClick={handleEditPlan}>
                  Edit current plan
                </div>
              </>
            )}
            {!planId && (
              <>
                <div
                  title="Create Encounter Plan"
                  onClick={handleCreateEncounterPlan}
                >
                  Create Encounter Plan
                </div>
                <div
                  title="Create Exploration Plan"
                  onClick={handleCreateExplorationPlan}
                >
                  Create Exploration Plan
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderMenu();
};

export default EditPlannerMenu;
