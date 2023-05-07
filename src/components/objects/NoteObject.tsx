import React, { useState, useEffect, useCallback } from "react";
import Markdown from "markdown-to-jsx";
import { Button } from "../buttons";
import styles from "./Objects.module.scss";
import { INote, PartialNote } from "../../api/model";
import { useNotes } from "../../hooks";

export interface INotesObjectProps {
  note?: PartialNote;
  onChange?: (note: PartialNote) => void;
}

/**
 * This component only handles rendering a note title and body passed as props
 */
function NotesObject({
  note = { title: "", body: "" },
  onChange,
}: INotesObjectProps) {
  const [editMode, setEditMode] = useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      if (
        typeof onChange === "function" &&
        (name === "body" || name === "title")
      ) {
        onChange({
          ...note,
          [name]: value,
        });
      }
    },
    [note]
  );

  console.log("debug: noteObject", { note });

  return (
    <div className={styles.notes}>
      <div className={styles.noteHeader}>
        <input
          className={styles.noteTitle}
          name="title"
          onChange={handleChange}
          placeholder="New note title"
          value={note.title}
        />
      </div>
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Preview" : "Edit"} Note
      </Button>
      {editMode ? (
        <textarea
          className={styles.notesEdit}
          value={note.body}
          name="body"
          onChange={handleChange}
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
