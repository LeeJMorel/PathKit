import React, { useState, useEffect } from "react";

function NotesObject() {
  const [notes, setNotes] = useState(""); // State to store notes

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <textarea
        style={{
          flex: 1,
          resize: "none",
          width: "100%",
          padding: 5,
          color: "black",
          backgroundColor: "white",
        }}
        value={notes}
        onChange={handleInputChange}
        placeholder="Type your notes here..."
      />
    </div>
  );
}

export default NotesObject;
