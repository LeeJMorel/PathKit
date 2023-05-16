import styles from "./Menu.module.scss";
import MenuButton from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IRemoveMenuProps {
  pathId: number;
  entityId: number;
  onRemove: () => void;
  onClose: () => void;
}

const RemoveMenu: React.FC<IRemoveMenuProps> = ({
  pathId,
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
            <h2>Remove From path</h2>
            <div className={styles.close} onClick={onClose}>
              <FontAwesomeIcon icon="close" />
            </div>
          </div>
          <p>
            Are you sure you wish to permanently remove this from your path? The
            NPC, Monster, Hazard, or Structure will still exist so you can load
            them back on by editing the path.
          </p>
          <div className={styles.menuRowContainer}>
            <MenuButton onClick={handleClose}>No</MenuButton>
            <MenuButton variant="destructive" onClick={handleRemove}>
              Remove from path
            </MenuButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMenu;
