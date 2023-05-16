import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dropdown.module.scss";
import { useNotes, usePreferencesStore, useOnClickOutside } from "../../hooks";

interface Action {
  label: string;
  onClick: () => void;
}

interface CreationDropdownProps {
  isOpen?: boolean;
  onClose: () => void;
}

const CreationDropdown: React.FC<CreationDropdownProps> = ({
  isOpen: isOpenProp,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const { setPreferences } = usePreferencesStore();
  const { addNote } = useNotes();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const actions = [
    {
      label: "Create a Player",
      onClick: () => navigate("/entity/new/edit?type=Player"),
    },
    { label: "Create a Path", onClick: () => navigate("/path/new") },
    {
      label: "Create a Note",
      onClick: async () => {
        const newNote = await addNote({ title: "", body: "" });
        setPreferences({
          selectedNoteSheet: newNote?.id,
        });
      },
    },
    {
      label: "Create an NPC",
      onClick: () => navigate("/entity/new/edit?type=NPC"),
    },
    {
      label: "Create a Shop",
      onClick: () => navigate("/entity/new/edit?type=Shop"),
    },
    {
      label: "Create a Monster",
      onClick: () => navigate("/entity/new/edit?type=Monster"),
    },
  ];

  const handleOutsideClick = () => {
    setIsOpen(false);
    onClose();
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  const handleActionClick = (action: Action) => {
    action.onClick();
    onClose();
  };

  return isOpen ? (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.menuDropdown}>
        <div className={styles.menuDropdownContent}>
          {actions.map((action, index) => (
            <div
              className={styles.option}
              key={index}
              onClick={() => handleActionClick(action)}
            >
              {action.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default CreationDropdown;
