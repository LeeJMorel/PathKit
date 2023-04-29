import React, { useState } from "react";
import SearchSheet from "../sheets/SearchSheet";
import EntitySheet from "../sheets/EntitySheet";
import NotesSheet from "../sheets/NotesSheet";
import styles from "./View.module.scss";
import { usePreferencesStore } from "../../hooks";
import EditSheet from "../sheets/EditSheet";

function SheetView() {
  const { preferences, setPreferences } = usePreferencesStore();
  const [isEditing, setIsEditing] = useState(false);
  let content;

  // Render different sheets based on the selectedSheet prop
  if (preferences.selectedEntity != null) {
    // If an entity is selected and editing is enabled, show the edit sheet for the selected ID
    if (isEditing) {
      // content = (
      //   <EditSheet
      //     type="Entity"
      //     entityData={preferences.selectedEntity}
      //     onClose={() => setIsEditing(false)}
      //   />
      // );
    } else {
      // If an entity is selected, show the entity sheet for the selected ID
      content = <EntitySheet />;
    }
  } else if (preferences.selectedSearch != null) {
    // If a search is selected, show the search sheet for the selected ID
    content = <SearchSheet />;
  } else {
    // If neither is selected, show the notes sheet
    content = <NotesSheet />;
  }

  return <div className={styles.sheetView}>{content}</div>;
}

export default SheetView;
