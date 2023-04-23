import React, { useState } from "react";
import styles from "./Menu.module.scss"; // Import your CSS/SCSS file for styling
import PlannerMenu from "./PlannerMenu";
import { AppMode } from "../../App";
import { IEntity, PlanType } from "../../api/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IMenuProps {
  planId?: string;
}

const EditPlannerMenu: React.FC<IMenuProps> = ({ planId }: IMenuProps) => {
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
    setMenuPlanType(PlanType.encounter);
    setIsMenuOpen(true);
  };

  const handleCreateExplorationPlan = () => {
    setMenuPlanType(PlanType.exploration);
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
          planId={planId}
          planType={menuPlanType}
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
