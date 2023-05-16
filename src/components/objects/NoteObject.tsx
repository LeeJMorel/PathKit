import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Button } from "../buttons";
import styles from "./Objects.module.scss";
import { PartialNote } from "../../api/model";
import { useNotes } from "../../hooks";

export interface INotesObjectProps {
  noteId?: number;
  onChange?: (note: PartialNote) => void;
  onClose?: () => void;
  defaultTitle?: string;
}

function NotesObject({
  noteId,
  onChange,
  onClose,
  defaultTitle = "",
}: INotesObjectProps) {
  const [note, setNote] = useState<PartialNote>({
    title: defaultTitle,
    body: "",
  });
  const [editMode, setEditMode] = useState(true);
  const { getNoteById } = useNotes();

  useEffect(() => {
    if (noteId) {
      const selectedNote = getNoteById(noteId);
      if (selectedNote) {
        return setNote(selectedNote);
      }
    }
    setNote({ title: defaultTitle, body: "" });
  }, [noteId, getNoteById]);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "body" || name === "title") {
      setNote((prev) => {
        const newNote = {
          ...prev,
          [name]: value,
        };
        if (typeof onChange === "function") {
          onChange(newNote);
        }
        return newNote;
      });
    }
  };

  return (
    <div className={styles.notes}>
      <div className={styles.noteHeader}>
        <div className={styles.noteHeaderTitle}>
          <input
            className={styles.noteTitle}
            name="title"
            onChange={handleChange}
            placeholder="New note title"
            value={note.title}
          />
          {typeof onClose === "function" && (
            <Button onClick={onClose} icon="close" variant="text" />
          )}
        </div>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Preview" : "Edit"} Note
        </Button>
      </div>
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
          <Markdown>{note.body}</Markdown>
        </div>
      )}
    </div>
  );
}

export default NotesObject;
