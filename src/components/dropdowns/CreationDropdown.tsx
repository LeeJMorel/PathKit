import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dropdown.module.scss";
import { useNotes, usePreferencesStore } from "../../hooks";

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
  const { updateOrAddNote } = useNotes();
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
    { label: "Create a Plan", onClick: () => navigate("/plan/new") },
    {
      label: "Create a note",
      onClick: async () => {
        const newNote = await updateOrAddNote({ title: "", body: "" });
        setPreferences({
          selectedNote: newNote?.id,
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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef, onClose]);

  const handleActionClick = (action: Action) => {
    action.onClick();
    onClose();
  };

  return isOpen ? (
    <div className={styles.dropdownContainer} onClick={onClose}>
      <div className={styles.menuDropdown} onClick={(e) => e.stopPropagation()}>
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
