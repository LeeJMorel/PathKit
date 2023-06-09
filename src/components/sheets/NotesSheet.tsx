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
      selectedNoteSheet: newNote?.id || "",
    });
  };

  const handleLoadNote = (id: string) => {
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
        <>
          <NoteObject
            onChange={handleChange}
            onClose={() =>
              setPreferences({
                selectedNoteSheet: "",
              })
            }
            noteId={preferences.selectedNoteSheet}
          />
          <span className={styles.caption}>
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              What is Markdown?
            </a>
          </span>
        </>
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
