import { useParams, useNavigate } from "react-router-dom";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { IEntity } from "../../api/model";
import { Button } from "../buttons";
import classNames from "classnames";

function EntitySheet() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const { getEntityById } = useEntities();
  const entity = getEntityById(entityId);

  const handleCancelClick = () => {
    navigate("/");
  };
  const handleEditClick = () => {
    navigate(`/entity/${entity?.entityId}/edit`);
  };

  return (
    <div className={styles.sheetsContainer}>
      {entity?.entityImage && (
        <div className={styles.imageContainer}>
          <img src={entity.entityImage} alt={entity.entityName} />
        </div>
      )}
      <div className={styles.header}>
        <h2>{entity?.entityName}</h2>
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
      <hr />
      <ul>
        {entity?.entityStats && (
          <li>
            Stats:
            <ul>
              {Object.entries(entity.entityStats).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </li>
        )}
        {entity?.entityHp && (
          <li>
            HP: {entity.entityHp[0]}/{entity.entityHp[1]}
            {entity.entityHp[2] && ` (+${entity.entityHp[2]} temp HP)`}
          </li>
        )}
        {entity?.entityEquipment && (
          <li>Equipment: {entity.entityEquipment.join(", ")}</li>
        )}
      </ul>
    </div>
  );
}

export default EntitySheet;
