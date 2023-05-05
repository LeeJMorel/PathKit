import { useState, useEffect } from "react";
import NotesObject from "../objects/NoteObject";
import styles from "./Sheets.module.scss";
import { useNotes, usePreferencesStore } from "../../hooks";
import { Button } from "../buttons";

function NotesSheet() {
  const { getNoteById, addNote, getLatestNote } = useNotes();
  const { preferences, setPreferences } = usePreferencesStore();
  const [note, setNote] = useState(
    getNoteById(preferences.selectedNote) || getLatestNote()
  );

  useEffect(() => {
    let newNote = getNoteById(preferences.selectedNote);
    if (preferences.selectedNote === null) {
      newNote = getLatestNote() || addNote({});
      setPreferences({
        selectedNote: newNote.id,
      });
    }
    setNote(newNote);
  }, [preferences.selectedNote]);

  return (
    <div className={styles.sheetsContainer}>
      <NotesObject note={note} />
    </div>
  );
}

export default NotesSheet;
