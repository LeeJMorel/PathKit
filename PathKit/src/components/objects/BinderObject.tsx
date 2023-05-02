import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Objects.module.scss";
import { Button } from "../buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEntities, usePreferencesStore, useStore } from "../../hooks";
import DeleteMenu from "../menus/DeleteMenu";
import PlannerMenu from "../menus/PlannerMenu";
import { IEntity } from "../../api/model";
import AddEntityForm from "../forms/AddEntityForm";

interface IBinderProps {
  load?: boolean;
}

const BinderObject: React.FC<IBinderProps> = ({ load }: IBinderProps) => {
  const plans = useStore((store) => store.plans);
  const [showMenu, setShowMenu] = useState(true);
  const [activeTab, setActiveTab] = useState("Plans");
  const navigate = useNavigate();

  useEffect(() => {
    if (load) {
      setActiveTab("NPCs");
    }
  }, [load]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleToggleClick = () => {
    setShowMenu(!showMenu);
  };

  const { preferences, setPreferences } = usePreferencesStore();

  const handleSelectClick = (id: string) => {
    const selectedSearch = null;
    setPreferences({
      ...preferences,
      // selectedEntity: id,
      selectedSearch,
    });
  };

  //load players
  const { getPlayerEntities } = useEntities();
  const players = getPlayerEntities();

  const handleEditEntity = (entity: IEntity) => {
    navigate(`/entity/${entity.id}/edit`);
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

  const [planId, setPlanId] = useState<string | null>(null);
  const handleEdit = (id: string) => {
    setPlanId(id);
  };

  return (
    <div className={styles.binderObject}>
      {planId && (
        <PlannerMenu onClose={() => setPlanId(null)} planId={planId} />
      )}
      {showDeleteMenu && (
        <DeleteMenu
          type={deleteType}
          id={deleteId}
          onClose={handleDeleteClose}
        />
      )}
      {showMenu && (
        <div className={styles.tabContainer}>
          {load != true && (
            <>
              <div
                className={`${styles.tab} ${
                  activeTab === "Plans" ? styles.active : ""
                }`}
                title={"Plans"}
                onClick={() => handleTabClick("Plans")}
              >
                Plans
              </div>
              <div
                className={`${styles.tab} ${
                  activeTab === "Notes" ? styles.active : ""
                }`}
                title={"Notes"}
                onClick={() => handleTabClick("Notes")}
              >
                Notes
              </div>
            </>
          )}
          <div
            className={`${styles.tab} ${
              activeTab === "NPCs" ? styles.active : ""
            }`}
            title={"NPCs"}
            onClick={() => handleTabClick("NPCs")}
          >
            NPCs
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "Shops" ? styles.active : ""
            }`}
            title={"Shops"}
            onClick={() => handleTabClick("Shops")}
          >
            Shops
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "Monsters" ? styles.active : ""
            }`}
            title={"Monsters"}
            onClick={() => handleTabClick("Monsters")}
          >
            Monsters
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "Players" ? styles.active : ""
            }`}
            title={"Players"}
            onClick={() => handleTabClick("Players")}
          >
            Players
          </div>
        </div>
      )}
      <div
        className={styles.menuToggle}
        title={"Toggle Binder Menu Visible"}
        onClick={handleToggleClick}
      >
        <FontAwesomeIcon
          icon={showMenu ? "angle-double-left" : "angle-double-right"}
        />
      </div>
      <div className={styles.content}>
        {activeTab === "Plans" && (
          <table className={styles.plansTable}>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className={styles.plansTableRow}>
                  <td className={styles.plansTableAction}>
                    <Button
                      variant="text"
                      title={"Edit Plan"}
                      onClick={() => handleEdit(plan.id)}
                    >
                      <FontAwesomeIcon icon="pencil" />
                    </Button>
                  </td>
                  <td
                    className={styles.plansTablePlanType}
                    title={plan.planType}
                  >
                    {plan.planType}
                  </td>
                  <td
                    className={styles.plansTableEntities}
                    title={`${plan.entities
                      .map((entity) => entity.name)
                      .join(", ")}`}
                  >
                    {plan.entities.map((entity, index) => (
                      <React.Fragment key={entity.id}>
                        {entity.name}
                        {index !== plan.entities.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </td>

                  <td className={styles.plansTableAction}>
                    <Button
                      title={"Delete Plan"}
                      onClick={() => handleDelete("plan", plan.id)}
                      icon="trash"
                      variant="text"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "Players" && (
          <table className={styles.plansTable}>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className={styles.plansTableRow}>
                  <td className={styles.plansTableAction}>
                    <Button
                      title={`Edit ${player.name}`}
                      onClick={() => handleEditEntity(player)}
                    >
                      <FontAwesomeIcon icon="pencil" />
                    </Button>
                  </td>
                  <td
                    className={styles.plansTablePlanType}
                    title={`${player.name}`}
                  >
                    {player.name}
                  </td>
                  <td className={styles.plansTableEntities}></td>
                  <td className={styles.plansTableAction}>
                    <Button
                      title={`Delete ${player.name}`}
                      onClick={() => handleDelete("entity", player.id)}
                      icon="trash"
                      variant="text"
                    />
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
