import styles from "./Menu.module.scss";
import MenuButton from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IRemoveMenuProps {
  planId: string;
  entityId: string;
  onRemove: () => void;
  onClose: () => void;
}

const RemoveMenu: React.FC<IRemoveMenuProps> = ({
  planId,
  entityId,
  onRemove,
  onClose,
}: IRemoveMenuProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.deleteMenu}>
          <div className={styles.header}>
            <h2>Remove From Plan</h2>
            <div className={styles.close} onClick={onClose}>
              <FontAwesomeIcon icon="close" />
            </div>
          </div>
          <p>
            Are you sure you wish to permanently remove this from your plan? The
            NPC, Beast, or Shop will still exist so you can load them back on by
            editing the plan.
          </p>
          <div className={styles.menuRowContainer}>
            <MenuButton onClick={handleClose}>No</MenuButton>
            <MenuButton variant="destructive" onClick={handleRemove}>
              Remove from Plan
            </MenuButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMenu;
