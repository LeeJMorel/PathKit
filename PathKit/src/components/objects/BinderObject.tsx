import React, { useState } from "react";
import styles from "./Objects.module.scss";
import { Button } from "../buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../hooks";
import DeleteMenu from "../menus/DeleteMenu";

const BinderObject = () => {
  const plans = useStore((store) => store.plans);
  const [showMenu, setShowMenu] = useState(true);
  const [activeTab, setActiveTab] = useState("Events");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setShowMenu(false);
  };

  const handleToggleClick = () => {
    setShowMenu(!showMenu);
  };

  //placeholder until store can delete
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<"entity" | "plan" | "campaign">(
    "entity"
  );
  const [deleteId, setDeleteId] = useState<string>("");

  const handleDelete = (type: "entity" | "plan" | "campaign", id: string) => {
    setShowDeleteMenu(true);
    setDeleteType(type);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setShowDeleteMenu(false);
  };

  return (
    <div className={styles.binderObject}>
      {showDeleteMenu && (
        <DeleteMenu
          type={deleteType}
          id={deleteId}
          onClose={handleDeleteClose}
        />
      )}
      {showMenu && (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              activeTab === "Events" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Events")}
          >
            Events
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "Notes" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Notes")}
          >
            Notes
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "NPCs" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("NPCs")}
          >
            NPCs
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "Shops" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Shops")}
          >
            Shops
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "Monsters" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("Monsters")}
          >
            Monsters
          </div>
        </div>
      )}
      <div className={styles.menuToggle} onClick={handleToggleClick}>
        {showMenu ? (
          <FontAwesomeIcon icon="angle-double-left" />
        ) : (
          <FontAwesomeIcon icon="angle-double-right" />
        )}
      </div>
      <div className={styles.content}>
        {activeTab === "Events" && (
          <table className={styles.plansTable}>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className={styles.plansTableRow}>
                  <td className={styles.plansTableAction}>
                    <Button>
                      <FontAwesomeIcon icon="pencil" />
                    </Button>
                  </td>
                  <td className={styles.plansTablePlanType}>{plan.planType}</td>
                  <td className={styles.plansTableEntities}>
                    {plan.entities.map((entity, index) => (
                      <React.Fragment key={entity.id}>
                        {entity.name}
                        {index !== plan.entities.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </td>
                  <td className={styles.plansTableAction}>
                    <div
                      className={styles.deleteButton}
                      onClick={() => handleDelete("plan", plan.id)}
                    >
                      <FontAwesomeIcon icon="close" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BinderObject;
