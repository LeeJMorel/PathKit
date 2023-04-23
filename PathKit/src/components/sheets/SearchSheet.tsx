import styles from "./Sheets.module.scss";

interface SearchSheetProps {
  searchInfo?: string;
}

function SearchSheet({ searchInfo }: SearchSheetProps) {
  return (
    <div className={styles.sheetsContainer}>
      {searchInfo ? <h1>idk</h1> : <h1>No search info available</h1>}
    </div>
  );
}

export default SearchSheet;
