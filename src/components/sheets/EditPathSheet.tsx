import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import uniq from "lodash.uniq";
import AddEntityForm from "../forms/AddEntityForm";
import { usePaths, useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button, ToggleButton } from "../buttons";
import {
  EntityType,
  PathType,
  IEntity,
  PartialEntity,
  PartialPath,
} from "../../api/model";
import BinderObject, { BinderTab } from "../objects/BinderObject";
import classNames from "classnames";
import ConfirmMenu from "../menus/ConfirmMenu";
import { defaultEntity, defaultPath } from "../../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultPathData = {
  type: PathType.encounter,
  entities: [],
};

function EditPathSheet() {
  const { entityId, pathId } = useParams();
  const [searchParams] = useSearchParams();
  const entityType = searchParams.get("type");
  const navigate = useNavigate();
  const { getPathById, updateOrAddPath } = usePaths();
  const { updateOrAddEntity, getEntityById } = useEntities();
  const [entityLoading, setEntityLoading] = useState(!!entityId);

  const [entityData, setEntityData] = useState<PartialEntity>({
    ...defaultEntity,
  });

  const [path, setPath] = useState<PartialPath>(
    getPathById(pathId) || defaultPath
  );

  useEffect(() => {
    const matchPath = getPathById(Number(pathId));
    if (matchPath) {
      setPath(matchPath);
    }
  }, [pathId]);

  useEffect(() => {
    const matchEntity = getEntityById(Number(entityId));
    if (matchEntity) {
      setEntityData(matchEntity);
    }
    setEntityLoading(false);
  }, [entityId]);

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleSavePath = () => {
    updateOrAddPath(path);
    navigate("/");
  };

  const [pathType, setPathType] = useState(PathType.encounter);
  const handlePathTypeChange = (type: PathType) => {
    console.log(type);
    setPath((prev) => ({
      ...prev,
      type,
    }));
    setPathType(type);
  };

  //We want to show the load menu
  const handleLoadClick = () => {
    navigate(`/path/${path.id}/load`);
  };

  // We want to add or edit an entity
  const handleEditEntity = (entity?: IEntity) => {
    navigate(`/path/${path.id}/entity/${entity?.id}/edit`);
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
      <Button
        onClick={() => {
          setEntityData({
            ...defaultEntity,
            type: EntityType.Shop,
          });
          navigate(`/path/${pathId}/entity/new/edit?type=Shop`);
        }}
      >
        Add Shop
      </Button>
      <Button
        onClick={() => {
          setEntityData({
            ...defaultEntity,
            type: EntityType.NPC,
          });
          navigate(`/path/${pathId}/entity/new/edit?type=NPC`);
        }}
      >
        Add NPC
      </Button>
      <Button
        onClick={() => {
          setEntityData({
            ...defaultEntity,
            type: EntityType.Monster,
          });
          navigate(`/path/${pathId}/entity/new/edit?type=Monster`);
        }}
      >
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
          title={`Remove ${entity.name} from plan`}
          onClick={() => handleRemoveEntity(entity.id)}
          icon="circle-minus"
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
        <div className={styles.title}>
          <h2 className={styles.heading}>{headerText}</h2>
        </div>
        <div className={styles.headerButtons}>
          <Button onClick={handleBackClick} icon="arrow-left" variant="text" />
        </div>
      </div>
      <div className={styles.sheetCenterContainer}>
        <ToggleButton
          options={[PathType.encounter, PathType.exploration]}
          value={pathType}
          onChange={(value) => handlePathTypeChange(value)}
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
            path="entity/:entityId/edit*"
            element={
              <div className={styles.editEntityContainer}>
                <div className={styles.header}>
                  <div className={styles.title}>
                    <h2 className={styles.heading}>Edit {entityData.type}</h2>
                  </div>
                  {/* TODO: goes back to plan, doesnt exit */}
                  <div className={styles.headerButtons}>
                    <Button
                      onClick={() => navigate(-1)}
                      icon="arrow-left"
                      variant="text"
                    />
                  </div>
                </div>
                {!entityLoading && (
                  <AddEntityForm
                    entityData={{ ...entityData, type: entityType } as IEntity}
                    onAddEntity={async (entity) => {
                      const newEntity = await updateOrAddEntity(entity);
                      if (newEntity) {
                        setPath((prev) => ({
                          ...prev,
                          entities: [...prev.entities, newEntity.id],
                        }));
                      }
                      navigate(-1);
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
