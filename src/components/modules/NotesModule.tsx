import { useCallback } from "react";
import styles from "./Modules.module.scss";
import { useNotes, usePreferencesStore } from "../../hooks";
import { PartialNote } from "../../api/model";
import { Button } from "../buttons";
import NoteObject from "../objects/NoteObject";
import BinderObject, { BinderTab } from "../objects/BinderObject";

function NotesModule() {
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
      selectedNoteModule: newNote?.id || "",
    });
  };

  const handleLoadNote = (id: string) => {
    setPreferences({
      selectedNoteModule: id,
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
    <div className={styles.moduleContent}>
      {!preferences.selectedNoteModule ? (
        renderCreateNote()
      ) : (
        <NoteObject
          onChange={handleChange}
          onClose={() =>
            setPreferences({
              selectedNoteModule: "",
            })
          }
          noteId={preferences.selectedNoteModule}
        />
      )}
      {notesExist && !preferences.selectedNoteModule && (
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

export default NotesModule;
