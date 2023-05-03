import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddEntityForm from "../forms/AddEntityForm";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { Button } from "../buttons";

function EditEntitySheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate(-1);
  };

  //edit an entity
  const { updateEntity, getEntityById } = useEntities();

  const entityData = useMemo(() => getEntityById(id), [id]);
  const type = entityData?.entityType || "Entity";
  let headerText = `Add ${type}`;
  if (id) {
    headerText = `Edit ${type}`;
  }

  return (
    <div className={styles.sheetsContainer}>
      {entityData?.image && (
        <div className={styles.imageContainer}>
          <img src={entityData.image} alt={entityData.name} />
        </div>
      )}
      <div className={styles.header}>
        <h2>{headerText}</h2>
        <Button onClick={handleCancelClick} icon="arrow-left" variant="text" />
      </div>
      <hr />
      <AddEntityForm
        entityData={entityData}
        type={entityData?.entityType}
        onAddEntity={(entity) => {
          updateEntity(entity);
          navigate(-1);
        }}
      />
    </div>
  );
}

export default EditEntitySheet;