import React, { useState, useEffect } from "react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "../buttons";
import styles from "./Objects.module.scss";
import { PartialNote } from "../../api/model";
import { useNotes, usePreferencesStore } from "../../hooks";
import "./NoteEditor.scss";

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
  const { preferences } = usePreferencesStore();
  const { enableFancyEditor } = preferences;

  useEffect(() => {
    if (noteId) {
      const selectedNote = getNoteById(noteId);
      if (selectedNote) {
        return setNote(selectedNote);
      }
    }
    setNote({ title: defaultTitle, body: "" });
  }, [noteId, getNoteById]);

  const handleChange = (
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

  const handleEditorChange: MDEditorProps["onChange"] = (value) => {
    setNote((prev) => {
      const newNote = {
        ...prev,
        body: value || "",
      };
      if (typeof onChange === "function") {
        onChange(newNote);
      }
      return newNote;
    });
  };

  const renderEditor = () => {
    if (enableFancyEditor) {
      return (
        <MDEditor
          value={note.body}
          onChange={handleEditorChange}
          preview="edit"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          visibleDragbar={false}
          height="100%"
          style={{ background: "transparent" }}
        />
      );
    }
    return editMode ? (
      <textarea
        className={styles.notesEdit}
        value={note.body}
        name="body"
        onChange={handleChange}
        placeholder="Type your notes here. I support Markdown syntax."
      />
    ) : (
      <div className={styles.notesContainer}>
        <MDEditor.Markdown source={note.body}></MDEditor.Markdown>
      </div>
    );
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
        {!enableFancyEditor && (
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Preview" : "Edit"} Note
          </Button>
        )}
      </div>
      {renderEditor()}
    </div>
  );
}

export default NotesObject;
