import { useCallback } from "react";
import NoteObject from "../objects/NoteObject";
import styles from "./Sheets.module.scss";
import { useNotes, usePreferencesStore } from "../../hooks";
import { Button } from "../buttons";
import { PartialNote } from "../../api/model";
import BinderObject, { BinderTab } from "../objects/BinderObject";

function NotesSheet() {
  const { addNote, updateOrAddNote, notes } = useNotes();
  const { preferences, setPreferences } = usePreferencesStore();
  const notesExist = notes.length > 0;

  const handleChange = (newNote: PartialNote) => {
    updateOrAddNote(newNote);
  };
  
  const handleCreateNoteClick = async () => {
    const newNote = await addNote({
      title: new Date().toLocaleString(),
      body: "",
    });
    setPreferences({
      selectedNoteSheet: newNote?.id || 0,
    });
  };

  const handleLoadNote = (id: number) => {
    setPreferences({
      selectedNoteSheet: id,
    });
  };

  const renderCreateNote = useCallback(() => {
    return (
      <div className={styles.notesFallback}>
        <h3>{notesExist ? "No note selected." : "Create your first note."}</h3>
        <div className={styles.actionRow}>
          <Button onClick={handleCreateNoteClick} variant="primary">
            Create Note
          </Button>
        </div>
      </div>
    ); 
  }, [notesExist]);

  return (
    <div className={styles.sheetsContainer}>
      {!preferences.selectedNoteSheet ? (
        renderCreateNote()
      ) : (
        <NoteObject
          onChange={handleChange}
          onClose={() =>
            setPreferences({
              selectedNoteSheet: 0,
            })
          }
          noteId={preferences.selectedNoteSheet}
        />
      )}
      {notesExist && !preferences.selectedNoteSheet && (
        <div className={styles.notesBinder}>
          <BinderObject
            showTabs={[BinderTab.Notes]}
            showTabMenu={false}
            onLoad={handleLoadNote}
          />
        </div>
      )}
    </div>
  );
}

export default NotesSheet;
