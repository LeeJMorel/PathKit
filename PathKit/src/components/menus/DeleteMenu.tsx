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
import { useNavigate } from "react-router-dom";

interface IDeleteMenuProps {
  type: "entity" | "plan" | "campaign" | "note";
  id: string;
  onClose: () => void;
}

const DeleteMenu: React.FC<IDeleteMenuProps> = ({
  type,
  id,
  onClose,
}: IDeleteMenuProps) => {
  const navigate = useNavigate();
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
            selectedPlan: null,
          });
        }
        deletePlan(id);
        break;

      case "entity":
        deleteEntity(id);
        break;

      case "campaign":
        if (preferences.currentCampaignId === id) {
          setPreferences({
            currentCampaignId: null,
          });
        }
        deleteCampaign(id);
        window.location.reload();
        setShowWelcomeMenu(true); // set the state to show the WelcomeMenu
        break;

      case "note":
        if (preferences.selectedNote === id) {
          setPreferences({
            selectedNote: null,
          });
        }
        deleteNote(id);
        break;

      default:
        break;
    }

    handleClose();
    navigate("/");
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
