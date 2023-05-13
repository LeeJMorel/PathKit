import { useParams, useNavigate } from "react-router-dom";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState, useEffect } from "react";

import { Button } from "../buttons";
import classNames from "classnames";
import { defaultEntity } from "../../consts";

function EntitySheet() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const { getEntityById } = useEntities();
  const [entity, setEntity] = useState(defaultEntity);

  useEffect(() => {
    const matchEntity = getEntityById(Number(entityId));
    if (matchEntity) {
      setEntity(matchEntity);
    }
  }, [entityId]);
  const handleCancelClick = () => {
    navigate("/");
  };
  const handleEditClick = useCallback(() => {
    navigate(`/entity/${entityId}/edit`);
  }, [entity]);

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <h2>{entity?.name}</h2>
        <div className={styles.headerButtons}>
          <Button
            className={styles.headerButton}
            variant="text"
            onClick={handleEditClick}
            icon="pencil"
          >
            Edit
          </Button>
          <Button
            className={classNames(styles.headerButton, styles.closeButton)}
            variant="text"
            onClick={handleCancelClick}
            icon="close"
            title="Close entity"
          />
        </div>
      </div>
      {entity?.image && (
        <div className={styles.imageContainer}>
          <img src={entity.image} alt={entity.name} />
        </div>
      )}
      <div>
        <pre>{JSON.stringify(entity, null, 2)}</pre>
      </div>
    </div>
  );
}

export default EntitySheet;
