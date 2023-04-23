import styles from "./Sheets.module.scss";

interface EntitySheetProps {
  entityInfo?: string;
}

function EntitySheet({ entityInfo }: EntitySheetProps) {
  return (
    <div className={styles.sheetsContainer}>
      {entityInfo ? <h1>idk</h1> : <h1>No entity info available</h1>}
    </div>
  );
}

export default EntitySheet;
