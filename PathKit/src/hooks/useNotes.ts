import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { INote } from "../api/model";
import { usePreferencesStore } from "./usePreferencesStore";

interface IUseNotes {
  notes: INote[];
  setNotes: (notes: INote[]) => void;
  addNote: (note: Omit<INote, "id" | "campaignId">) => void;
  getNoteById: (noteId?: string) => INote | undefined;
  deleteNote: (noteId: string) => void;
}
export const useNotes = (): IUseNotes => {
  const { notes, setNotes, refreshNotes } = useStore((store) => ({
    notes: store.notes,
    setNotes: store.setNotes,
    refreshNotes: store.refreshNotes,
  }));
  const currentCampaignId = usePreferencesStore(
    (store) => store.preferences.currentCampaignId
  );

  // Initial call should refresh stored notes from API
  useEffect(() => {
    refreshNotes();
  }, []);

  const addNote = useCallback(
    (newNote: Omit<INote, "id" | "campaignId">): void => {
      const note: INote = {
        ...newNote,
        id: uuid(),
        campaignId: currentCampaignId, // TODO get campaignId from high level
      } as INote;

      return setNotes([...notes, note]);
    },
    [notes, currentCampaignId]
  );

  const getNoteById = useCallback(
    (noteId?: string): INote | undefined => {
      const matches = notes.filter((p) => p.id === noteId);
      if (matches.length) {
        return matches[0];
      }
    },
    [notes]
  );

  const deleteNote = useCallback(
    (noteId: string): void => {
      return setNotes(notes.filter((p) => p.id !== noteId));
    },
    [notes]
  );

  return {
    notes,
    setNotes,
    addNote,
    getNoteById,
    deleteNote,
  };
};
