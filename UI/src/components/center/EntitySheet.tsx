import styles from "./Sheets.module.scss";
import { ObjectProps } from "../../App";

interface EntitySheetProps {
  entityInfo?: ObjectProps;
}

function EntitySheet({ entityInfo }: EntitySheetProps) {
  return (
    <div className={styles.sheetsContainer}>
      {entityInfo ? (
        <h1>{entityInfo.name}</h1>
      ) : (
        <h1>No entity info available</h1>
      )}
    </div>
  );
}

export default EntitySheet;
