import NotesObject from "./NoteObject";
import styles from "./Sheets.module.scss";

function NotesSheet() {
  return (
    <div className={styles.sheetsContainer}>
      <NotesObject />
    </div>
  );
}

export default NotesSheet;
