import styles from "./Sheets.module.scss";
import { usePreferencesStore } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchSheet() {
  const { preferences, setPreferences } = usePreferencesStore();

  const handleCancelClick = () => {
    setPreferences({ selectedSearch: null });
  };

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <h2>{preferences.selectedSearch}</h2>
        <button onClick={handleCancelClick}>
          <FontAwesomeIcon icon="close" />
        </button>
      </div>
      <hr />
      <p>
        I'm a placeholder, when search is functional you'll see a description
        here
      </p>
    </div>
  );
}

export default SearchSheet;
