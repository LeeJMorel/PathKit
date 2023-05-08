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
    navigate(`/entity/${entity?.id}/edit`);
  };

  return (
    <div className={styles.sheetsContainer}>
      {entity?.image && (
        <div className={styles.imageContainer}>
          <img src={entity.image} alt={entity.name} />
        </div>
      )}
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
      <hr />
      <ul>
        {/* {entity?.stats && (
          <li>
            Stats:
            <ul>
              {Object.entries(entity.stats).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </li>
        )}
        {entity?.hp && (
          <li>
            HP: {entity.hp[0]}/{entity.hp[1]}
            {entity.hp[2] && ` (+${entity.hp[2]} temp HP)`}
          </li>
        )}
        {entity?.equipment && <li>Equipment: {entity.equipment.join(", ")}</li>} */}
      </ul>
    </div>
  );
}

export default EntitySheet;
