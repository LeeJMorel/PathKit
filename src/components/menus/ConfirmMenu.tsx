import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import styles from "./Menu.module.scss";

export interface IConfirmMenuProps {
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  message?: string;
  children?: React.ReactNode;
}

const ConfirmMenu: React.FC<IConfirmMenuProps> = ({
  onClose,
  onConfirm,
  onCancel,
  confirmText = "Yes I'm sure",
  cancelText = "Nevermind",
  title = "Are you sure?",
  message,
  children,
}: IConfirmMenuProps) => {
  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <div className={styles.close} onClick={onClose}>
            <FontAwesomeIcon icon="close" />
          </div>
        </div>
        {message ? <p>{message}</p> : children}
        <div className={styles.menuRowContainer}>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMenu;
