import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import uniq from "lodash.uniq";
import AddEntityForm from "../forms/AddEntityForm";
import { PartialPath, usePaths, useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button, ToggleButton } from "../buttons";
import { EntityType, PathType, IEntity, PartialEntity } from "../../api/model";
import BinderObject, { BinderTab } from "../objects/BinderObject";
import classNames from "classnames";
import ConfirmMenu from "../menus/ConfirmMenu";
import { defaultEntity } from "../../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultPathData = {
  type: PathType.encounter,
  entities: [],
};

function EditPathSheet() {
  const { entityId, pathId } = useParams();
  const navigate = useNavigate();
  const { getPathById, updateOrAddPath } = usePaths();
  const { updateOrAddEntity, getEntityById } = useEntities();
  const [loading, setLoading] = useState(!!entityId);

  const [entityData, setEntityData] = useState<PartialEntity>({
    ...defaultEntity,
  });

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
    const matchEntity = getEntityById(Number(entityId));
    if (matchEntity) {
      setEntityData(matchEntity);
    }
    setLoading(false);
  }, [entityId, pathId]);

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
      navigate(`/path/${path.id}/entity/new?type=${selectedEntityType}`);
    },
    [path]
  );
  const handleEditEntity = (entity?: IEntity) => {
    navigate(`/entity/${entity?.id}/edit`);
  };

  //we want to remove an entity from our path
  const handleRemoveEntity = (id: number) => {
    setPath((prev) => ({
      ...prev,
      entities: uniq(prev.entities.filter((i) => i !== id)),
    }));
  };

  const pathEntities = path.entities.map((entityId) => getEntityById(entityId));
  let headerText = `path: ${pathEntities
    .map((entity) => entity?.name)
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
      <Button onClick={() => navigate(`/entity/new/edit?type=Shop`)}>
        Add Shop
      </Button>
      <Button onClick={() => navigate(`/entity/new/edit?type=NPC}`)}>
        Add NPC
      </Button>
      <Button onClick={() => navigate(`/entity/new/edit?type=Monster`)}>
        Add Monster
      </Button>
      <Button onClick={() => handleLoadClick()}>Load</Button>
    </div>
  );

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
        {/* {typeof onLoad === "function" ? (
          <Button
            title={`Load ${entity.name}`}
            onClick={() => onLoad(entity.id)}
            icon={<FontAwesomeIcon icon="share-from-square" rotation={270} />}
            variant="text"
          />
        ) : ( */}
        <Button
          title={`Delete ${entity.name}`}
          onClick={() => handleRemoveEntity(entity.id)}
          icon="trash"
          variant="text"
        />
        {/* )} */}
      </td>
    </tr>
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const handleConfirm = () => {
    setShowConfirm(false);
  };

  const handleBackClick = () => {
    setShowConfirm(true);
  };

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <h2>{headerText}</h2>
        <Button onClick={handleBackClick} icon="arrow-left" variant="text" />
      </div>
      <div className={styles.sheetCenterContainer}>
        <ToggleButton
          options={[PathType.encounter, PathType.exploration]}
          value={pathType}
          onChange={handlePathTypeChange}
        />
      </div>
      {/* TODO only showConfirm if form is dirty */}
      {showConfirm && (
        <ConfirmMenu
          title="Unsaved changes will be lost"
          onClose={() => setShowConfirm(false)}
          onCancel={handleCancelClick}
          onConfirm={handleConfirm}
          cancelText="Leave anyway"
          confirmText="Stay"
        >
          <p>
            Do you really want to leave the editor? All unsaved changes will be
            lost.
          </p>
        </ConfirmMenu>
      )}
      <div className={styles.entityList}>
        {pathEntities.map(
          (pathEntity) => pathEntity && renderEntityRow(pathEntity)
        )}
      </div>
      <div className={styles.sheetRowContainer}>
        <Routes>
          <Route index element={renderAddEntityRow()} />
          <Route
            path="entity/:entityId"
            element={
              <div className={styles.editEntityContainer}>
                <div className={styles.header}>
                  <h2>Edit {entityData.type}</h2>
                  {/* TODO: goes back to plan, doesnt exit */}
                  <Button
                    onClick={handleBackClick}
                    icon="arrow-left"
                    variant="text"
                  />
                </div>
                {entityData?.image && (
                  <div className={styles.imageContainer}>
                    <img src={entityData.image} alt={entityData.name} />
                  </div>
                )}
                {!loading && (
                  <AddEntityForm
                    entityData={entityData as IEntity}
                    onAddEntity={(entity) => {
                      updateOrAddEntity(entity);
                      navigate("/");
                    }}
                  />
                )}
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
