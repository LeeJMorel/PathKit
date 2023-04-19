import styles from "./Modules.module.scss";
import NoteObject from "../sheets/NoteObject";

function NotesModule() {
  return (
    <div className={styles.moduleContainer}>
      <NoteObject />
    </div>
  );
}

export default NotesModule;
