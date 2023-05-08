import { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { INote, PartialNote } from "../api/model";
import useBoolean from "./useBoolean";

interface IUseNotes {
  notes: INote[];
  getNoteById: (noteId: number) => INote | undefined;
  deleteNote: (noteId: number) => void;
  updateOrAddNote: (note: PartialNote) => Promise<INote | undefined>;
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

  const debouncedUpdateOrAdd = debounce(async (newNote: PartialNote) => {
    return await insertNote(newNote);
  }, 500);

  const updateOrAddNote = async (
    newNote: PartialNote
  ): Promise<INote | undefined> => {
    console.log("debug: updateOrAdd", { newNote });
    const note = {
      ...newNote,
      title:
        newNote.title.length > 0 ? newNote.title : new Date().toLocaleString(),
    };
    return debouncedUpdateOrAdd(note);
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
    (id: number): void => {
      deleteNoteFromDb(id);
      if (id === preferences.selectedNoteSheet) {
        setPreferences({
          selectedNoteSheet: 0,
        });
      }
      if (id === preferences.selectedNoteModule) {
        setPreferences({
          selectedNoteModule: 0,
        });
      }
    },
    [preferences]
  );

  return {
    notes,
    getNoteById,
    deleteNote,
    updateOrAddNote,
    getLatestNote,
  };
};
