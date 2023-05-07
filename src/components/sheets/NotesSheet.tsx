import { useState, useEffect } from "react";
import NotesObject from "../objects/NoteObject";
import styles from "./Sheets.module.scss";
import { useNotes, usePreferencesStore } from "../../hooks";
import { Button } from "../buttons";
import { PartialNote, INote } from "../../api/model";

function NotesSheet() {
  const { getNoteById, getLatestNote, updateOrAddNote } = useNotes();
  const { preferences, setPreferences } = usePreferencesStore();
  const [note, setNote] = useState(
    getNoteById(preferences.selectedNote) || getLatestNote()
  );

  useEffect(() => {
    const selectedNote = getNoteById(preferences.selectedNote);
    console.log("debug: selectedNote useeffect", { selectedNote, preferences });
    if (selectedNote) {
      setNote(selectedNote);
    }
  }, [preferences.selectedNote]);

  useEffect(() => {
    const initNote = async () => {
      console.log("debug: initNote");
      let newNote = getNoteById(preferences.selectedNote) || getLatestNote();
      if (!newNote) {
        newNote = await updateOrAddNote({
          title: "",
          body: "",
        });

        console.log("debug: initNote", { newNote });
        setPreferences({
          selectedNote: newNote?.id || 0,
        });
      }
      setNote(newNote);
    };
    initNote();
  }, [preferences.selectedNote]);

  const handleChange = (newNote: PartialNote) => {
    setNote((prev) => ({ ...prev, ...newNote } as INote));
    updateOrAddNote(newNote);
  };

  return (
    <div className={styles.sheetsContainer}>
      <NotesObject note={note} onChange={handleChange} />
    </div>
  );
}

export default NotesSheet;
