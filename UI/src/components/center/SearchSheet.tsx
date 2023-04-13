import styles from "./Sheets.module.scss";
import { ObjectProps } from "../../App";

interface SearchSheetProps {
  searchInfo?: ObjectProps;
}

function SearchSheet({ searchInfo }: SearchSheetProps) {
  return (
    <div className={styles.sheetsContainer}>
      {searchInfo ? (
        <h1>{searchInfo.name}</h1>
      ) : (
        <h1>No search info available</h1>
      )}
    </div>
  );
}

export default SearchSheet;
