import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Button } from "../buttons";
import styles from "./Objects.module.scss";
import { INote } from "../../api/model";
import { useNotes, PartialNote } from "../../hooks";

export interface INotesObjectProps {
  note?: INote;
}
function NotesObject({ note: noteProp }: INotesObjectProps) {
  const { getLatestNote, addNote, updateOrAddNote } = useNotes();
  const [note, setNote] = useState<PartialNote>(
    noteProp || getLatestNote() || addNote({})
  );
  // const [notes, setNotes] = useState(""); // State to store notes
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    // Function to handle automatic saving of notes whenever they change
    updateOrAddNote(note);
  }, [note]);

  useEffect(() => {
    setNote(noteProp || addNote({}));
  }, [noteProp]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setNotes(event.target.value); // Update notes state with input value
    console.log(event);
    setNote((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setNotes(event.target.value); // Update notes state with input value
    console.log(event);
    setNote((prev) => ({
      ...prev,
      body: event.target.value,
    }));
  };

  return (
    <div className={styles.notes}>
      <div className={styles.noteHeader}>
        <input
          className={styles.noteTitle}
          name="title"
          onChange={handleTitleChange}
          placeholder="New note title"
          value={note.title}
        />
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Preview" : "Edit"} Note
        </Button>
      </div>
      {editMode ? (
        <textarea
          className={styles.notesEdit}
          value={note.body}
          name="body"
          onChange={handleBodyChange}
          placeholder="Type your notes here. I support Markdown syntax."
        />
      ) : (
        <div className={styles.notesContainer}>
          <Markdown>{note.body || "## Edit this note"}</Markdown>
        </div>
      )}
      <span className={styles.caption}>
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          What is Markdown?
        </a>
      </span>
    </div>
  );
}

export default NotesObject;
