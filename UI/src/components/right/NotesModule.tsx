import NotesObject from "../center/NoteObject";
import styles from "./Modules.module.scss";
import NoteObject from "../center/NoteObject";

function NotesModule() {
  return (
    <div className={styles.moduleContainer}>
      <NoteObject />
    </div>
  );
}

export default NotesModule;
