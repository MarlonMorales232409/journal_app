import {
    addDoc,
    collection,
    updateDoc,
    doc,
    onSnapshot,
    deleteDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../types/types";

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: { id, ...note },
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes,
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        // const notes = await loadNotes(uid);
        onSnapshot(collection(db, `/${uid}/journal/notes`), (querySnapshot) => {
            let notes = [];
            querySnapshot.forEach((doc) => {
                notes = [...notes, { id: doc.id, ...doc.data() }];
                dispatch(setNotes(notes));
            });
        });
    };
};

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
            url: null,
        };

        const doc = await addDoc(
            collection(db, `${uid}/journal/notes`),
            newNote
        );

        dispatch(activeNote(doc.id, newNote));
    };
};

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const noteFirestore = { ...note };
        delete noteFirestore.id;
        if (!note.url) {
            delete note.url;
        }

        try {
            await updateDoc(
                doc(db, `${uid}/journal/notes/${note.id}`),
                noteFirestore
            );

            dispatch(refreshNote(note.id, note));

            Swal.fire("Saved", note.title, "success");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong, check your internet conection",
            });
        }
    };
};

const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: { id, note: { id, ...note } },
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        // Swal.fire({
        //     // title: "Uploading...",
        //     // text: "Please wait...",
        //     // allowOutsideClick: false,
        //     onBeforeOpen: () => {
        //         Swal.showLoading();
        //     },
        // });

        Swal.showLoading();

        const url = await fileUpload(file);
        activeNote.url = url;

        dispatch(updateNoteUrl(activeNote));

        Swal.close();
    };
};

const updateNoteUrl = (url) => ({
    type: types.notesFileUrl,
    payload: url,
});

export const startDeleteNote = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await deleteDoc(doc(db, `${uid}/journal/notes`, id));

        dispatch(notesDelete(id));
    };
};

const notesDelete = (id) => ({
    type: types.notesDelete,
    payload: id,
});

export const notesLogoutCleaning = () => ({
    type: types.notesLogoutCleaning,
});
