import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import PlannerMenu from "./PlannerMenu";
import { IEntity, IPlan, PlanType } from "../../api/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePreferencesStore, usePlans } from "../../hooks";

const EditPlannerMenu = () => {
  //check a plan is already running
  const { preferences, setPreferences } = usePreferencesStore();

  //if a plan is selected, pass that along for edits
  const { getPlanById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(undefined);
  useEffect(
    () => setCurrentPlan(getPlanById(preferences.selectedPlan || undefined)),
    [preferences.selectedPlan, getPlanById]
  );

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuPlanType, setMenuPlanType] = useState<PlanType>(
    PlanType.encounter
  );

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCreateEncounterPlan = () => {
    setIsEdit(false);
    setMenuPlanType(PlanType.encounter);
    setIsMenuOpen(true);
  };

  const handleCreateExplorationPlan = () => {
    setIsEdit(false);
    setMenuPlanType(PlanType.exploration);
    setIsMenuOpen(true);
  };

  const handleEditPlan = () => {
    setIsEdit(true);
    setIsMenuOpen(true);
  };

  const renderMenu = () => {
    if (isMenuOpen) {
      return (
        <>
          {isEdit && (
            <PlannerMenu
              onClose={handleCloseMenu}
              planId={currentPlan?.id}
              planType={currentPlan?.planType}
            />
          )}
          {!isEdit && (
            <PlannerMenu onClose={handleCloseMenu} planType={menuPlanType} />
          )}
        </>
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
            {preferences.selectedPlan && (
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
            {!preferences.selectedPlan && (
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
