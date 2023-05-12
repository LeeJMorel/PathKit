import BinderObject from "../objects/BinderObject";
import styles from "./Modules.module.scss";
import CollapsibleHeader from "../headers/CollapsibleHeader";

function BinderModule() {
  return (
    <>
      <CollapsibleHeader
        className={styles.moduleContainer}
        title="Binder"
        toggle
      >
        <BinderObject />
      </CollapsibleHeader>
    </>
  );
}

export default BinderModule;
