import { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { INote, PartialNote } from "../api/model";
import useBoolean from "./useBoolean";

interface IUseNotes {
  notes: INote[];
  getNoteById: (noteId: string) => INote | undefined;
  deleteNote: (noteId: string) => void;
  addNote: (note: PartialNote) => Promise<INote | undefined>;
  updateOrAddNote: (
    note: PartialNote,
    onNoteUpdate?: (note: INote) => void
  ) => Promise<void>;
  getLatestNote: () => INote | undefined;
}
export const useNotes = (): IUseNotes => {
  const { value: mounted, setTrue: setMountedTrue } = useBoolean(false);
  const { notes, refreshNotes, insertNote, deleteNoteFromDb } = useStore(
    (store) => ({
      notes: store.notes,
      refreshNotes: store.refreshNotes,
      insertNote: store.insertNote,
      deleteNoteFromDb: store.deleteNote,
    })
  );
  const { preferences, setPreferences } = usePreferencesStore();

  // Initial call should refresh stored notes from API
  useEffect(() => {
    if (!mounted && notes.length < 1) {
      refreshNotes();
      setMountedTrue();
    }
  }, [mounted, notes]);

  const getNoteById = useCallback(
    (noteId?: string | number | null): INote | undefined => {
      return notes.find((n) => n.id === noteId);
    },
    [notes]
  );

  const addNote = async (newNote: PartialNote): Promise<INote | undefined> => {
    const note = {
      ...newNote,
      title:
        newNote.title.length > 0 ? newNote.title : new Date().toLocaleString(),
    };
    return await insertNote(note);
  };

  const debouncedUpdateOrAdd = debounce(
    async (newNote: PartialNote, onNoteUpdate?: (note: INote) => void) => {
      const updatedNote = await insertNote(newNote);
      if (typeof onNoteUpdate === "function" && updatedNote) {
        onNoteUpdate(updatedNote);
      }
    },
    1000
  );

  const updateOrAddNote = async (
    newNote: PartialNote,
    onNoteUpdate?: (note: INote) => void
  ): Promise<void> => {
    const note = {
      ...newNote,
      title:
        newNote.title.length > 0 ? newNote.title : new Date().toLocaleString(),
    };
    debouncedUpdateOrAdd(note, onNoteUpdate);
  };

  const getLatestNote = (): INote | undefined => {
    if (notes.length === 0) return;
    return notes.sort((a, z) => {
      const dateA = Date.parse(a.modifiedDate || a.createDate);
      const dateZ = Date.parse(z.modifiedDate || z.createDate);
      return dateZ - dateA;
    })[0];
  };

  const deleteNote = useCallback(
    (id: string): void => {
      deleteNoteFromDb(id);
      if (id === preferences.selectedNoteSheet) {
        setPreferences({
          selectedNoteSheet: "",
        });
      }
      if (id === preferences.selectedNoteModule) {
        setPreferences({
          selectedNoteModule: "",
        });
      }
    },
    [preferences]
  );

  return {
    notes,
    getNoteById,
    deleteNote,
    addNote,
    updateOrAddNote,
    getLatestNote,
  };
};
