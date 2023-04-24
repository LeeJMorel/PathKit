import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Card.module.scss";
import { useState } from "react";
import { IEntity } from "../../api/model";
import AddPlayerMenu from "../menus/AddPlayerMenu";
import { useEntities } from "../../hooks";

function AddPlayerCard() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { addEntity } = useEntities();

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <button
          title="Add a Player"
          className={styles.cardAddButton}
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp;Add a Player
        </button>
      </div>
      {isMenuOpen && <AddPlayerMenu onClose={handleCloseMenu} />}
    </div>
  );
}

export default AddPlayerCard;
