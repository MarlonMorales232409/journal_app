import { db } from "../firebase/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export const loadNotes = async (uid) => {
    // const querySnapshot = await getDocs(
    //     collection(db, `/${uid}/journal/notes`)
    // );
    let fullNotes = [];
    onSnapshot(collection(db, `/${uid}/journal/notes`), (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
            notes = [...notes, { id: doc.id, ...doc.data() }];
        });
        return notes;
    });

    console.log(fullNotes);

    // querySnapshot.forEach((doc) => {
    //     console.log(doc);
    //     notes.push({ id: doc.id, ...doc.data() });
    // });

    return fullNotes;
};
