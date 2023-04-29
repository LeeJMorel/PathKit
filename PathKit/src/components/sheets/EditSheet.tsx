import styles from "./Sheets.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddEntityForm, { IEntityFormProps } from "../forms/AddEntityForm";
import { EntityType, IEntity } from "../../api/model";
import { useState } from "react";
import { useEntities } from "../../hooks";

function EditSheet({
  type,
  entityData,
  onAddEntity,
  onClose,
}: IEntityFormProps) {
  const handleCancelClick = () => {
    onClose?.();
  };

  //edit an entity
  const { updateEntity } = useEntities();
  const [showEntityForm, setShowEntityForm] = useState<IEntity | null>(null);
  const handleEditEntity = (entity: IEntity) => {
    setShowEntityForm(entity);
  };
  const handleEditClose = () => {
    setShowEntityForm(null);
  };

  let headerText = "Add Entity";
  if (entityData) {
    headerText = `Edit ${type}`;
  } else {
    headerText = `Add ${type}`;
  }

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <h2>{headerText}</h2>
        <button onClick={handleEditClose}>
          <FontAwesomeIcon icon="close" />
        </button>
      </div>
      <hr />
      {showEntityForm && (
        <AddEntityForm
          entityData={showEntityForm}
          type={showEntityForm.entityType}
          onAddEntity={(entity) => {
            updateEntity(entity);
            setShowEntityForm(null);
          }}
        />
      )}
    </div>
  );
}

export default EditSheet;
