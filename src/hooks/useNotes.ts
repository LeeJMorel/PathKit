import { useEffect, useCallback } from "react";
import { useStore } from "./useStore";
import { usePreferencesStore } from "./usePreferencesStore";
import { INote, PartialNote } from "../api/model";

interface IUseNotes {
  notes: INote[];
  getNoteById: (noteId: number) => INote | undefined;
  deleteNote: (noteId: number) => void;
  updateOrAddNote: (note: PartialNote) => Promise<INote | undefined>;
  getLatestNote: () => INote | undefined;
}
export const useNotes = (): IUseNotes => {
  const { notes, refreshNotes, insertNote, updateNote, deleteNoteFromDb } =
    useStore((store) => ({
      notes: store.notes,
      refreshNotes: store.refreshNotes,
      insertNote: store.insertNote,
      updateNote: store.updateNote,
      deleteNoteFromDb: store.deleteNote,
    }));
  const { preferences, setPreferences } = usePreferencesStore();

  // Initial call should refresh stored notes from API
  useEffect(() => {
    refreshNotes();
  }, []);

  const getNoteById = useCallback(
    (noteId?: string | number | null): INote | undefined => {
      return notes.find((n) => n.id === noteId);
    },
    [notes]
  );

  const updateOrAddNote = async (
    newNote: PartialNote
  ): Promise<INote | undefined> => {
    console.log("debug: updateOrAdd", { newNote });
    const note = {
      ...newNote,
      title:
        newNote.title.length > 0 ? newNote.title : new Date().toLocaleString(),
    };
    return !newNote.id ? await insertNote(note) : await updateNote(note);
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
      if (id === preferences.selectedNote) {
        setPreferences({
          selectedNote: 0,
        });
      }
    },
    [preferences.selectedNote]
  );

  return {
    notes,
    getNoteById,
    deleteNote,
    updateOrAddNote,
    getLatestNote,
  };
};
