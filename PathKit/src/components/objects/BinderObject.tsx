import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Objects.module.scss";
import { Button } from "../buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useEntities,
  usePreferencesStore,
  useStore,
  useNotes,
  usePlans,
} from "../../hooks";
import DeleteMenu from "../menus/DeleteMenu";
import { EntityType, IEntity, INote } from "../../api/model";

interface IBinderProps {
  onLoad?: (entity: IEntity) => void;
  filterEntities?: string[];
}

const BinderObject: React.FC<IBinderProps> = ({
  onLoad,
  filterEntities,
}: IBinderProps) => {
  const { plans } = usePlans();
  const { notes } = useNotes();
  const { entities, getPlayerEntities, getEntitiesById } = useEntities();
  const [showMenu, setShowMenu] = useState(true);
  const [activeTab, setActiveTab] = useState("Plans");
  const navigate = useNavigate();

  useEffect(() => {
    if (onLoad) {
      setActiveTab("NPCs");
    }
  }, [onLoad]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleToggleClick = () => {
    setShowMenu(!showMenu);
  };

  const { preferences, setPreferences } = usePreferencesStore();

  //load players
  const players = getPlayerEntities();
  const filteredEntities = entities.filter(
    (e) => !filterEntities?.includes(e.id)
  );
  const npcs = filteredEntities.filter((e) => e.entityType === EntityType.NPC);
  const beasts = filteredEntities.filter(
    (e) => e.entityType === EntityType.beast
  );
  const shops = filteredEntities.filter(
    (e) => e.entityType === EntityType.Shop
  );

  //placeholder until store can delete
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<
    "entity" | "plan" | "campaign" | "note"
  >("entity");
  const [deleteId, setDeleteId] = useState<string>("");

  const handleDelete = (
    type: "entity" | "plan" | "campaign" | "note",
    id: string
  ) => {
    setShowDeleteMenu(true);
    setDeleteType(type);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setShowDeleteMenu(false);
  };

  const handleEditPlan = (id: string) => {
    navigate(`/plan/${id}`);
  };

  const handleEditEntity = (entity: IEntity) => {
    navigate(`/entity/${entity.id}/edit`);
  };

  const handleEditNote = (note: INote) => {
    setPreferences({
      selectedNote: note.id,
    });
  };

  const renderEntityRow = (entity: IEntity) => (
    <tr key={entity.id} className={styles.plansTableRow}>
      <td className={styles.plansTableAction}>
        <Button
          variant="text"
          title={`Edit ${entity.name}`}
          onClick={() => handleEditEntity(entity)}
        >
          <FontAwesomeIcon icon="pencil" />
        </Button>
      </td>
      <td className={styles.plansTablePlanType} title={`${entity.name}`}>
        {entity.name}
      </td>
      <td className={styles.plansTableEntities}></td>
      <td className={styles.plansTableAction}>
        {typeof onLoad === "function" ? (
          <Button
            title={`Load ${entity.name}`}
            onClick={() => onLoad(entity)}
            icon={<FontAwesomeIcon icon="share-from-square" rotation={270} />}
            variant="text"
          />
        ) : (
          <Button
            title={`Delete ${entity.name}`}
            onClick={() => handleDelete("entity", entity.id)}
            icon="trash"
            variant="text"
          />
        )}
      </td>
    </tr>
  );

  const getEntitiesText = (entities: IEntity[]): string => {
    const maxShown = 5;
    const length = entities.length;
    let result = entities
      .slice(0, maxShown)
      .map((e) => e.name)
      .join(", ");
    if (length > maxShown) {
      result = `${result} +${length - maxShown}`;
    }
    return result;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Plans":
        return plans.map((plan) => {
          const planEntities = getEntitiesById(plan.entities);
          return (
            <tr key={plan.id} className={styles.plansTableRow}>
              <td className={styles.plansTableAction}>
                <Button
                  variant="text"
                  title={"Edit Plan"}
                  onClick={() => handleEditPlan(plan.id)}
                >
                  <FontAwesomeIcon icon="pencil" />
                </Button>
              </td>
              <td className={styles.plansTablePlanType} title={plan.planType}>
                {plan.planType}
              </td>
              <td
                className={styles.plansTableEntities}
                title={`${planEntities
                  .map((entity) => entity.name)
                  .join(", ")}`}
              >
                {getEntitiesText(planEntities)}
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
          );
        });

      case "Notes":
        return notes.map((note) => (
          <tr key={note.id} className={styles.plansTableRow}>
            <td className={styles.plansTableAction}>
              <Button
                variant="text"
                title={"Edit Note"}
                onClick={() => handleEditNote(note)}
              >
                <FontAwesomeIcon icon="pencil" />
              </Button>
            </td>
            <td className={styles.plansTableSpan} title={note.title}>
              {note.title}
            </td>

            <td className={styles.plansTableAction}>
              <Button
                title={"Delete Note"}
                onClick={() => handleDelete("note", note.id)}
                icon="trash"
                variant="text"
              />
            </td>
          </tr>
        ));

      case "Players":
        return players.map((player) => renderEntityRow(player));

      case "NPCs":
        return npcs.map((npc) => renderEntityRow(npc));

      case "Shops":
        return shops.map((shop) => renderEntityRow(shop));

      case "Beasts":
        return beasts.map((beast) => renderEntityRow(beast));

      default:
        break;
    }
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
          {!onLoad && (
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
                  activeTab === "Players" ? styles.active : ""
                }`}
                title={"Players"}
                onClick={() => handleTabClick("Players")}
              >
                Players
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
              activeTab === "Beasts" ? styles.active : ""
            }`}
            title={"beasts"}
            onClick={() => handleTabClick("beasts")}
          >
            Beasts
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
        <table className={styles.plansTable}>
          <tbody>{renderTabContent()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default BinderObject;
