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
  usePaths,
} from "../../hooks";
import DeleteMenu from "../menus/DeleteMenu";
import { EntityType, IEntity, INote } from "../../api/model";

export enum BinderTab {
  Paths = "Paths",
  Players = "Players",
  Notes = "Notes",
  NPCs = "NPCs",
  Shops = "Shops",
  Monsters = "Monsters",
}

interface IBinderProps {
  onLoad?: (id: number) => void;
  filterEntities?: (string | number)[];
  showTabs?: BinderTab[];
  showTabMenu?: boolean;
}

const BinderObject: React.FC<IBinderProps> = ({
  onLoad,
  filterEntities,
  showTabs = [
    BinderTab.Paths,
    BinderTab.Players,
    BinderTab.Notes,
    BinderTab.NPCs,
    BinderTab.Shops,
    BinderTab.Monsters,
  ],
  showTabMenu = true,
}: IBinderProps) => {
  const { paths } = usePaths();
  const { notes } = useNotes();
  const { entities, getPlayerEntities, getEntitiesById } = useEntities();
  const [showMenu, setShowMenu] = useState(showTabMenu);
  const [activeTab, setActiveTab] = useState(showTabs[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (onLoad) {
      setActiveTab(showTabs[0]);
    }
  }, [onLoad]);

  const handleTabClick = (tabName: BinderTab) => {
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
  const npcs = filteredEntities.filter((e) => e.type === EntityType.NPC);
  const monsters = filteredEntities.filter(
    (e) => e.type === EntityType.Monster
  );
  const shops = filteredEntities.filter((e) => e.type === EntityType.Shop);

  //placeholder until store can delete
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<
    "entity" | "path" | "campaign" | "note"
  >("entity");
  const [deleteId, setDeleteId] = useState<number>(0);

  const handleDelete = (
    type: "entity" | "path" | "campaign" | "note",
    id: number
  ) => {
    setShowDeleteMenu(true);
    setDeleteType(type);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setShowDeleteMenu(false);
  };

  const handleEditPath = (pathId: number) => {
    navigate(`/path/${pathId}`);
  };

  const handleEditEntity = (entity: IEntity) => {
    navigate(`/entity/${entity.id}/edit`);
  };

  const handleEditNote = (note: INote) => {
    setPreferences({
      selectedNoteSheet: note.id,
    });
  };

  const renderEntityRow = (entity: IEntity) => (
    <tr key={entity.id} className={styles.pathsTableRow}>
      <td className={styles.pathsTableAction}>
        <Button
          variant="text"
          title={`Edit ${entity.name}`}
          onClick={() => handleEditEntity(entity)}
        >
          <FontAwesomeIcon icon="pencil" />
        </Button>
      </td>
      <td className={styles.pathsTablePathType} title={`${entity.name}`}>
        {entity.name}
      </td>
      <td className={styles.pathsTableEntities}></td>
      <td className={styles.pathsTableAction}>
        {typeof onLoad === "function" ? (
          <Button
            title={`Load ${entity.name}`}
            onClick={() => onLoad(entity.id)}
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
      case "Paths":
        return paths.map((path) => {
          const pathEntities = getEntitiesById(path.entities);
          return (
            <tr key={path.id} className={styles.pathsTableRow}>
              <td className={styles.pathsTableAction}>
                <Button
                  variant="text"
                  title={"Edit path"}
                  onClick={() => handleEditPath(path.id)}
                >
                  <FontAwesomeIcon icon="pencil" />
                </Button>
              </td>
              <td className={styles.pathsTablePathType} title={path.type}>
                {path.type}
              </td>
              <td
                className={styles.pathsTableEntities}
                title={`${pathEntities
                  .map((entity) => entity.name)
                  .join(", ")}`}
              >
                {getEntitiesText(pathEntities)}
              </td>

              <td className={styles.pathsTableAction}>
                <Button
                  title={"Delete path"}
                  onClick={() => handleDelete("path", path.id)}
                  icon="trash"
                  variant="text"
                />
              </td>
            </tr>
          );
        });

      case "Notes":
        return notes.map((note) => (
          <tr key={note.id} className={styles.pathsTableRow}>
            <td className={styles.pathsTableAction}>
              {typeof onLoad === "function" ? (
                <Button
                  title={`Load ${note.title}`}
                  onClick={() => onLoad(note.id)}
                  icon={
                    <FontAwesomeIcon icon="share-from-square" rotation={270} />
                  }
                  variant="text"
                />
              ) : (
                <Button
                  variant="text"
                  title={"Edit Note"}
                  onClick={() => handleEditNote(note)}
                >
                  <FontAwesomeIcon icon="pencil" />
                </Button>
              )}
            </td>
            <td className={styles.pathsTableSpan} title={note.title}>
              {note.title}
            </td>

            <td className={styles.pathsTableAction}>
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

      case "Monsters":
        return monsters.map((monster) => renderEntityRow(monster));

      default:
        break;
    }
  };

  const renderTab = (tab: BinderTab): JSX.Element | undefined =>
    showTabs.includes(tab) ? (
      <div
        key={tab}
        className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
        title={tab}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </div>
    ) : undefined;

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
          {showTabs.map((tab) => renderTab(tab))}
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
        <table className={styles.pathsTable}>
          <tbody>{renderTabContent()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default BinderObject;
