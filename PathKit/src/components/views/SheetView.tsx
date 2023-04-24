import React from "react";
import SearchSheet from "../sheets/SearchSheet";
import EntitySheet from "../sheets/EntitySheet";
import NotesSheet from "../sheets/NotesSheet";
import styles from "./View.module.scss";
import { usePreferencesStore } from "../../hooks";

function SheetView() {
  const { preferences, setPreferences } = usePreferencesStore();
  const { selectedSheet } = preferences;
  let content;

  // Render different sheets based on the selectedHeaderItem prop
  if (selectedSheet) {
    // If an entity is selected, show the entity sheet for the selected ID
    content = <EntitySheet />;
    // } else if (searchID) {
    //   // If a search is selected, show the search sheet for the selected ID
    //   content = <SearchSheet searchInfo={searchID} />;
  } else {
    // If neither is selected, show the notes sheet
    content = <NotesSheet />;
  }

  return <div className={styles.sheetView}>{content}</div>;
}

export default SheetView;
