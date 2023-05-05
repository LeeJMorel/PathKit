import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { INote } from "../api/model";
import { usePreferencesStore } from "./usePreferencesStore";
import { PartialBy } from "../utilities";

export type PartialNote = Partial<INote>;

interface IUseNotes {
  notes: INote[];
  setNotes: (notes: INote[]) => void;
  addNote: (note: PartialNote) => INote;
  getNoteById: (noteId?: string | number | null) => INote | undefined;
  deleteNote: (noteId: string | number) => void;
  updateNote: (note: PartialNote) => INote;
  updateOrAddNote: (note: PartialNote) => INote;
  getLatestNote: () => INote | undefined;
}
export const useNotes = (): IUseNotes => {
  const { notes, setNotes, refreshNotes, currentCampaignId } = useStore(
    (store) => ({
      notes: store.notes,
      setNotes: store.setNotes,
      refreshNotes: store.refreshNotes,
      currentCampaignId: store.currentCampaignId,
    })
  );

  // Initial call should refresh stored notes from API
  useEffect(() => {
    refreshNotes();
  }, []);

  const addNote = useCallback(
    (newNote: PartialNote): INote => {
      const date = new Date().toLocaleString();
      const note: INote = {
        noteTitle: date,
        noteBody: "",
        ...newNote,
        noteId: uuid(),
        noteCreateDate: date,
        noteModifiedDate: date,
        campaignId: currentCampaignId,
      } as INote;

      setNotes([...notes, note]);
      return note;
    },
    [notes, currentCampaignId]
  );

  const getNoteById = useCallback(
    (noteId?: string | number | null): INote | undefined => {
      const matches = notes.filter((p) => p.noteId === noteId);
      if (matches.length) {
        return matches[0];
      }
    },
    [notes]
  );

  const deleteNote = useCallback(
    async (noteId: string | number): Promise<void> => {
      return await setNotes(notes.filter((p) => p.noteId !== noteId));
    },
    [notes]
  );

  const updateNote = useCallback(
    (newNote: PartialNote): INote => {
      const date = new Date().toLocaleString();
      let note = newNote;
      const newNotes: INote[] = notes.map((n) => {
        if (n.noteId === note.noteId) {
          note = Object.assign({}, n, note);
          note.noteModifiedDate = date;
          return note as INote;
        }
        return n;
      });

      setNotes(newNotes);
      return note as INote;
    },
    [notes]
  );

  const updateOrAddNote = (newNote: PartialNote): INote => {
    return newNote.noteId ? updateNote(newNote) : addNote(newNote);
  };

  const getLatestNote = (): INote | undefined => {
    if (notes.length === 0) return;
    return notes.sort((a, z) => {
      const dateA = Date.parse(a.noteModifiedDate || a.noteCreateDate);
      const dateZ = Date.parse(z.noteModifiedDate || z.noteCreateDate);
      return dateZ - dateA;
    })[0];
  };

  return {
    notes: notes.filter((n) => n.campaignId === currentCampaignId),
    setNotes,
    addNote,
    getNoteById,
    deleteNote,
    updateNote,
    updateOrAddNote,
    getLatestNote,
  };
};
