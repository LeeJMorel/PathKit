import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import uniq from "lodash.uniq";
import AddEntityForm from "../forms/AddEntityForm";
import { PartialPath, usePaths, useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button, ToggleButton } from "../buttons";
import { EntityType, PathType, IEntity } from "../../api/model";
import BinderObject, { BinderTab } from "../objects/BinderObject";
import classNames from "classnames";

const defaultPathData = {
  type: PathType.encounter,
  entities: [],
};
function EditPathSheet() {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const { getPathById, updateOrAddPath } = usePaths();
  const { getEntitiesById } = useEntities();

  const [path, setPath] = useState<PartialPath>(
    getPathById(pathId) || defaultPathData
  );

  useEffect(() => {
    (async () => {
      const p = await getPathById(pathId);
      // Create path and redirect to this form with the right ID
      if (pathId === "new") {
        const newPath = await updateOrAddPath(defaultPathData);
        navigate(`/path/${newPath?.id}`, {
          replace: true,
        });
      } else if (p) {
        setPath(p);
      }
    })();
  }, [pathId]);

  const pathEntities = getEntitiesById(path.entities);

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleSavePath = () => {
    updateOrAddPath(path);
    navigate("/");
  };

  const [pathType, setPathType] = useState(PathType.encounter);
  const handlePathTypeChange = (value: PathType) => {
    setPath((prev) => ({
      ...prev,
      type: value,
    }));
    setPathType(value);
  };

  //We want to show the load menu
  const handleLoadClick = () => {
    navigate(`/path/${path.id}/load`);
  };

  // We want to add or edit an entity
  const handleAddEntity = useCallback(
    (selectedEntityType: EntityType) => {
      console.log({ path, pathId, what: getPathById(pathId) });
      navigate(`/path/${path.id}/entity/new?type=${selectedEntityType}`);
    },
    [path]
  );
  const handleEditEntity = useCallback(
    (entityId: number) => {
      navigate(`/path/${path.id}/entity/${entityId}`);
    },
    [path]
  );

  //we want to remove an entity from our path
  const handleRemoveEntity = (id: number) => {
    setPath((prev) => ({
      ...prev,
      entities: uniq(prev.entities.filter((i) => i !== id)),
    }));
  };

  let headerText = `path: ${pathEntities
    .map((entity) => entity.name)
    .join(", ")}`;

  const handleLoadEntity = (entityId: number) => {
    setPath((prev) => ({
      ...prev,
      entities: uniq([...prev.entities, entityId]),
    }));
    navigate(-1);
  };

  const renderAddEntityRow = () => (
    <div className={styles.sheetRowContainer}>
      <Button type="submit" variant="primary" onClick={() => handleAddEntity(EntityType.Shop)}>Add Shop</Button>
      <Button type="submit" variant="primary" onClick={() => handleAddEntity(EntityType.NPC)}>Add NPC</Button>
      <Button type="submit" variant="primary" onClick={() => handleAddEntity(EntityType.Monster)}>
        Add Monster
      </Button>
      <Button onClick={() => handleLoadClick()}>Load</Button>
    </div>
  );

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <h2>{headerText}</h2>
        <Button
          onClick={handleCancelClick}
          title="Cancel"
          icon="close"
          variant="text"
        />
      </div>
      <hr />
      <div className={styles.entityList}>
        {pathEntities.map((entity) => (
          <div key={entity.id} className={styles.sheetRowContainer}>
            <div className={styles.sheetEndContainer}>
              <Button
                variant="text"
                onClick={() => handleEditEntity(entity.id)}
                icon="pencil"
                title={`Edit ${entity.type || "entity"}`}
              />

              <div className={styles.menuTitle}>{entity.name}</div>
            </div>
            {entity.id && (
              <Button
                variant="text"
                className={styles.deleteButton}
                onClick={() => handleRemoveEntity(entity.id)}
                icon="user-minus"
                title="Remove from path"
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.sheetCenterContainer}>
        <ToggleButton
          options={[PathType.encounter, PathType.exploration]}
          value={pathType}
          onChange={handlePathTypeChange}
        />
      </div>
      <div className={styles.sheetRowContainer}>
        <Routes>
          <Route index element={renderAddEntityRow()} />
          <Route
            path="entity/:entityId"
            element={
              <div className={styles.editEntityContainer}>
                <h3>Edit entity</h3>
                {/* <AddEntityForm
                  onAddEntity={(entity) => {
                    if (entity?.id) {
                      setPath((prev) => ({
                        ...prev,
                        entities: uniq([...prev.entities, entity.id]),
                      }));
                    }
                    navigate(-1);
                  }}
                /> */}
              </div>
            }
          />
          <Route
            path="load"
            element={
              <div className={styles.binderContainer}>
                <BinderObject
                  onLoad={handleLoadEntity}
                  filterEntities={path.entities}
                  showTabs={[
                    BinderTab.NPCs,
                    BinderTab.Shops,
                    BinderTab.Monsters,
                  ]}
                />
              </div>
            }
          />
        </Routes>
      </div>

      <div className={classNames(styles.sheetRowContainer, styles.end)}>
        <Button onClick={handleSavePath} variant="primary">
          Save path
        </Button>
      </div>
    </div>
  );
}

export default EditPathSheet;
