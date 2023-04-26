import BinderObject from "../objects/BinderObject";
import styles from "./Modules.module.scss";

function BinderModule() {
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.moduleHeader}>
        <h4>Binder</h4>
      </div>
      <BinderObject />
    </div>
  );
}

export default BinderModule;
