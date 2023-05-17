import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AddEntityForm from "../forms/AddEntityForm";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button } from "../buttons";
import { EntityType, IEntity, PartialEntity } from "../../api/model";
import { defaultEntity } from "../../consts";
import ImportEntity from "../objects/ImportEntity";
import ConfirmMenu from "../menus/ConfirmMenu";
import { SheetHeader } from "./SheetHeader";

function EditEntitySheet() {
  const { entityId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateOrAddEntity, getEntityById } = useEntities();
  const type = (searchParams.get("type") as EntityType) || EntityType.none;
  const [loading, setLoading] = useState(!!entityId);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formDirty, setFormDirty] = useState<boolean>(false);

  const [entityData, setEntityData] = useState<PartialEntity>({
    ...defaultEntity,
    type,
  });

  useEffect(() => {
    const matchEntity = getEntityById(entityId);
    if (matchEntity) {
      setEntityData(matchEntity);
    }
    setLoading(false);
  }, [entityId, type]);

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
  };

  const handleBackClick = () => {
    setShowConfirm(true);
    if (formDirty) {
      setShowConfirm(true);
    } else {
      handleCancelClick();
    }
  };

  return (
    <div className={styles.sheetsContainer}>
      <SheetHeader
        title={`Edit ${entityData.name || entityData.type}`}
        subtitle={`(${entityData.type})`}
        onBackClick={handleBackClick}
      />
      {entityData?.image && (
        <div className={styles.imageContainer}>
          <img src={entityData.image} alt={entityData.name} />
        </div>
      )}
      {entityData.type === EntityType.Player && (
        <ImportEntity entity={entityData} />
      )}
      {!loading && (
        <AddEntityForm
          entityData={entityData as IEntity}
          onAddEntity={(entity) => {
            updateOrAddEntity(entity);
            navigate("/");
          }}
          setFormDirty={setFormDirty}
        />
      )}
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
    </div>
  );
}

export default EditEntitySheet;
