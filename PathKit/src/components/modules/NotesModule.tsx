import NoteObject from "../objects/NoteObject";
import styles from "./Modules.module.scss";

function NotesModule() {
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.moduleHeader} />
      <div className={styles.moduleContent}>
        <NoteObject />
      </div>
    </div>
  );
}

export default NotesModule;
