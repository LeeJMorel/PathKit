import styles from "./Menu.module.scss";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  usePlans,
  useEntities,
  useCampaigns,
  useNotes,
  usePreferencesStore,
} from "../../hooks";
import { WelcomeMenu } from "./WelcomeMenu";
import { useState, useCallback } from "react";

interface IDeleteMenuProps {
  type: "entity" | "plan" | "campaign" | "note";
  id: number;
  onClose: () => void;
}

const DeleteMenu: React.FC<IDeleteMenuProps> = ({
  type,
  id,
  onClose,
}: IDeleteMenuProps) => {
  const { deletePlan } = usePlans();
  const { deleteEntity } = useEntities();
  const { deleteCampaign } = useCampaigns();
  const { deleteNote } = useNotes();
  const { preferences, setPreferences } = usePreferencesStore();
  const [showWelcomeMenu, setShowWelcomeMenu] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleYesClick = useCallback(() => {
    switch (type) {
      case "plan":
        if (preferences.selectedPlan === id) {
          setPreferences({
            selectedPlan: 0,
          });
        }
        deletePlan(id);
        break;

      case "entity":
        deleteEntity(id);
        break;

      case "campaign":
        deleteCampaign(id);
        window.location.reload();
        setShowWelcomeMenu(true); // set the state to show the WelcomeMenu
        break;

      case "note":
        if (preferences.selectedNoteSheet === id) {
          setPreferences({
            selectedNoteSheet: 0,
          });
        }
        if (preferences.selectedNoteModule === id) {
          setPreferences({
            selectedNoteModule: 0,
          });
        }
        deleteNote(id);
        break;

      default:
        break;
    }

    handleClose();
  }, []);

  return (
    <div className={styles.menuOverlay}>
      <div className={styles.mainMenu}>
        {showWelcomeMenu ? ( // conditionally render the WelcomeMenu
          <WelcomeMenu />
        ) : (
          <div className={styles.deleteMenu}>
            <div className={styles.header}>
              <h2>Delete {type}</h2>
              <div className={styles.close} onClick={handleClose}>
                <FontAwesomeIcon icon="close" />
              </div>
            </div>
            <p>
              Are you sure you wish to permanently remove this? Once you press
              "Delete {type}", this cannot be undone.
            </p>
            <div className={styles.menuRowContainer}>
              <Button variant="primary" onClick={handleClose}>
                No
              </Button>
              <Button variant="destructive" onClick={handleYesClick}>
                Delete {type}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteMenu;
