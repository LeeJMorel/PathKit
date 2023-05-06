export {};

// import { useEffect, useCallback } from "react";
// import { v4 as uuid } from "uuid";
// import { useStore } from "./useStore";
// import { INote } from "../api/model";
// import { usePreferencesStore } from "./usePreferencesStore";
// import { PartialBy } from "../utilities";

// export type PartialNote = Partial<INote>;

// interface IUseNotes {
//   notes: INote[];
//   setNotes: (notes: INote[]) => void;
//   addNote: (note: PartialNote) => INote;
//   getNoteById: (noteId?: string | null) => INote | undefined;
//   deleteNote: (noteId: string) => void;
//   updateNote: (note: PartialNote) => INote;
//   updateOrAddNote: (note: PartialNote) => INote;
//   getLatestNote: () => INote | undefined;
// }
// export const useNotes = (): IUseNotes => {
//   const { notes, setNotes, refreshNotes } = useStore((store) => ({
//     notes: store.notes,
//     setNotes: store.setNotes,
//     refreshNotes: store.refreshNotes,
//   }));
//   const currentCampaignId = usePreferencesStore(
//     (store) => store.preferences.currentCampaignId
//   );

//   // Initial call should refresh stored notes from API
//   useEffect(() => {
//     refreshNotes();
//   }, []);

//   const addNote = useCallback(
//     (newNote: PartialNote): INote => {
//       const date = new Date().toLocaleString();
//       const note: INote = {
//         title: date,
//         body: "",
//         ...newNote,
//         id: uuid(),
//         createDate: date,
//         modifiedDate: date,
//         campaignId: currentCampaignId,
//       } as INote;

//       setNotes([...notes, note]);
//       return note;
//     },
//     [notes, currentCampaignId]
//   );

//   const getNoteById = useCallback(
//     (noteId?: string | null): INote | undefined => {
//       const matches = notes.filter((p) => p.id === noteId);
//       if (matches.length) {
//         return matches[0];
//       }
//     },
//     [notes]
//   );

//   const deleteNote = useCallback(
//     (noteId: string): void => {
//       return setNotes(notes.filter((p) => p.id !== noteId));
//     },
//     [notes]
//   );

//   const updateNote = useCallback(
//     (newNote: PartialNote): INote => {
//       const date = new Date().toLocaleString();
//       let note = newNote;
//       const newNotes: INote[] = notes.map((n) => {
//         if (n.id === note.id) {
//           note = Object.assign({}, n, note);
//           note.modifiedDate = date;
//           return note as INote;
//         }
//         return n;
//       });

//       setNotes(newNotes);
//       return note as INote;
//     },
//     [notes]
//   );

//   const updateOrAddNote = (newNote: PartialNote): INote => {
//     return newNote.id ? updateNote(newNote) : addNote(newNote);
//   };

//   const getLatestNote = (): INote | undefined => {
//     if (notes.length === 0) return;
//     return notes.sort((a, z) => {
//       const dateA = Date.parse(a.modifiedDate || a.createDate);
//       const dateZ = Date.parse(z.modifiedDate || z.createDate);
//       return dateZ - dateA;
//     })[0];
//   };

//   return {
//     notes: notes.filter((n) => n.campaignId === currentCampaignId),
//     setNotes,
//     addNote,
//     getNoteById,
//     deleteNote,
//     updateNote,
//     updateOrAddNote,
//     getLatestNote,
//   };
// };
