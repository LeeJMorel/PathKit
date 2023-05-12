import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AddEntityForm from "../forms/AddEntityForm";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button } from "../buttons";
import { EntityType, IEntity, PartialEntity } from "../../api/model";
import { defaultEntity } from "../../consts";

function EditEntitySheet() {
  const { entityId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateOrAddEntity, getEntityById } = useEntities();
  const type = (searchParams.get("type") as EntityType) || EntityType.none;

  const [entityData, setEntityData] = useState<PartialEntity>({
    ...defaultEntity,
    type,
  });

  // TODO popup confirm if unsaved changes.
  // const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    (async () => {
      const matchEntity = await getEntityById(Number(entityId));
      if (matchEntity) {
        setEntityData(matchEntity);
      }
    })();
  }, [entityId, type]);

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.sheetsContainer}>
      {entityData?.image && (
        <div className={styles.imageContainer}>
          <img src={entityData.image} alt={entityData.name} />
        </div>
      )}
      <div className={styles.header}>
        <h2>Edit {entityData.type}</h2>
        <Button onClick={handleCancelClick} icon="arrow-left" variant="text" />
      </div>
      <hr />
      <AddEntityForm
        entityData={entityData as IEntity}
        onAddEntity={(entity) => {
          updateOrAddEntity(entity);
          navigate("/");
        }}
      />
    </div>
  );
}

export default EditEntitySheet;
