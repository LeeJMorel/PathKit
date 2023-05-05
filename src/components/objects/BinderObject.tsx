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
  filterEntities?: (string | number)[];
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
    (e) => !filterEntities?.includes(e.entityId)
  );
  const npcs = filteredEntities.filter((e) => e.entityType === EntityType.NPC);
  const monsters = filteredEntities.filter(
    (e) => e.entityType === EntityType.Monster
  );
  const shops = filteredEntities.filter(
    (e) => e.entityType === EntityType.Shop
  );

  //placeholder until store can delete
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<
    "entity" | "plan" | "campaign" | "note"
  >("entity");
  const [deleteId, setDeleteId] = useState<string | number>("");

  const handleDelete = (
    type: "entity" | "plan" | "campaign" | "note",
    id: string | number
  ) => {
    setShowDeleteMenu(true);
    setDeleteType(type);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setShowDeleteMenu(false);
  };

  const handleEditPlan = (planId: string | number) => {
    navigate(`/plan/${planId}`);
  };

  const handleEditEntity = (entity: IEntity) => {
    navigate(`/entity/${entity.entityId}/edit`);
  };

  const handleEditNote = (note: INote) => {
    setPreferences({
      selectedNote: note.noteId,
    });
  };

  const renderEntityRow = (entity: IEntity) => (
    <tr key={entity.entityId} className={styles.plansTableRow}>
      <td className={styles.plansTableAction}>
        <Button
          variant="text"
          title={`Edit ${entity.entityName}`}
          onClick={() => handleEditEntity(entity)}
        >
          <FontAwesomeIcon icon="pencil" />
        </Button>
      </td>
      <td className={styles.plansTablePlanType} title={`${entity.entityName}`}>
        {entity.entityName}
      </td>
      <td className={styles.plansTableEntities}></td>
      <td className={styles.plansTableAction}>
        {typeof onLoad === "function" ? (
          <Button
            title={`Load ${entity.entityName}`}
            onClick={() => onLoad(entity)}
            icon={<FontAwesomeIcon icon="share-from-square" rotation={270} />}
            variant="text"
          />
        ) : (
          <Button
            title={`Delete ${entity.entityName}`}
            onClick={() => handleDelete("entity", entity.entityId)}
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
      .map((e) => e.entityName)
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
          const planEntities = getEntitiesById(plan.planEntities);
          return (
            <tr key={plan.planId} className={styles.plansTableRow}>
              <td className={styles.plansTableAction}>
                <Button
                  variant="text"
                  title={"Edit Plan"}
                  onClick={() => handleEditPlan(plan.planId)}
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
                  .map((entity) => entity.entityName)
                  .join(", ")}`}
              >
                {getEntitiesText(planEntities)}
              </td>

              <td className={styles.plansTableAction}>
                <Button
                  title={"Delete Plan"}
                  onClick={() => handleDelete("plan", plan.planId)}
                  icon="trash"
                  variant="text"
                />
              </td>
            </tr>
          );
        });

      case "Notes":
        return notes.map((note) => (
          <tr key={note.noteId} className={styles.plansTableRow}>
            <td className={styles.plansTableAction}>
              <Button
                variant="text"
                title={"Edit Note"}
                onClick={() => handleEditNote(note)}
              >
                <FontAwesomeIcon icon="pencil" />
              </Button>
            </td>
            <td className={styles.plansTableSpan} title={note.noteTitle}>
              {note.noteTitle}
            </td>

            <td className={styles.plansTableAction}>
              <Button
                title={"Delete Note"}
                onClick={() => handleDelete("note", note.noteId)}
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

      case "Monsters":
        return monsters.map((monster) => renderEntityRow(monster));

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
              activeTab === "Monsters" ? styles.active : ""
            }`}
            title={"Monsters"}
            onClick={() => handleTabClick("Monsters")}
          >
            monsters
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
