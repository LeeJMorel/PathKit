import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Button } from "../buttons";
import styles from "./Objects.module.scss";

function NotesObject() {
  const [notes, setNotes] = useState(""); // State to store notes
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    // Function to handle automatic saving of notes whenever they change
    console.log("Notes saved:", notes);
  }, [notes]); // Save notes whenever they change

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNotes(event.target.value); // Update notes state with input value
  };

  return (
    <div className={styles.notes}>
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Preview" : "Edit"} Markdown
      </Button>
      {editMode ? (
        <textarea
        className={styles.notesEdit}
          value={notes}
          onChange={handleInputChange}
          placeholder="Type your notes here..."
        />
      ) : (
        <div className={styles.notesContainer}>
          <Markdown>{notes}</Markdown>
        </div>
      )}
    </div>
  );
}

export default NotesObject;
