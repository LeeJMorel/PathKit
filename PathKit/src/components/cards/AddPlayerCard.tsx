import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Card.module.scss";
import { useState } from "react";
import { IEntity } from "../forms/AddEntityForm";
import AddPlayerMenu from "../menus/AddPlayerMenu";

function AddPlayerCard() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSave = (entities: IEntity[]) => {
    const plan = {
      entities: entities,
    };
    // Do something with the plan data, such as saving it to a database
  };

  const renderMenu = () => {
    if (isMenuOpen) {
      return (
        <AddPlayerMenu
          onClose={handleCloseMenu}
          onSave={handleSave}
        ></AddPlayerMenu>
      );
    }

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
      </div>
    );
  };

  return <>{renderMenu()}</>;
}

export default AddPlayerCard;
