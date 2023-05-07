import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AddEntityForm from "../forms/AddEntityForm";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button } from "../buttons";
import { EntityType, IEntity, PartialEntity } from "../../api/model";

function EditEntitySheet() {
  const { entityId } = useParams();
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("type");
  const navigate = useNavigate();
  const { updateOrAddEntity, getEntityById } = useEntities();

  const [entityData, setEntityData] = useState<PartialEntity>(
    getEntityById(entityId) || {}
  );

  useEffect(() => {
    const initSheet = async () => {
      const e = await getEntityById(entityId);
      // Create entity and redirect to this form with the right ID
      if (entityId === "new") {
        const newEntity = await updateOrAddEntity({
          type: (searchType as EntityType) || undefined,
        });
        navigate(
          `/entity/${newEntity?.id}/edit${
            searchType ? "?type=" + searchType : ""
          }`,
          {
            replace: true,
          }
        );
      } else if (e) {
        setEntityData(e);
      }
    };
    initSheet();
  }, [entityId]);

  const handleCancelClick = () => {
    navigate(-1);
  };

  const type = entityData?.type || searchType || "Entity";

  return (
    <div className={styles.sheetsContainer}>
      {entityData?.image && (
        <div className={styles.imageContainer}>
          <img src={entityData.image} alt={entityData.name} />
        </div>
      )}
      <div className={styles.header}>
        <h2>Edit {type}</h2>
        <Button onClick={handleCancelClick} icon="arrow-left" variant="text" />
      </div>
      <hr />
      <AddEntityForm
        entityData={entityData as IEntity}
        type={entityData?.type}
        onAddEntity={(entity) => {
          updateOrAddEntity(entity);
          navigate(-1);
        }}
      />
    </div>
  );
}

export default EditEntitySheet;
