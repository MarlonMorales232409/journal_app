import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzQvXoYzX-n1HPfHueuXTv1r6h_j0ug5o",
  authDomain: "journal-app-f3f9c.firebaseapp.com",
  projectId: "journal-app-f3f9c",
  storageBucket: "journal-app-f3f9c.appspot.com",
  messagingSenderId: "331547835183",
  appId: "1:331547835183:web:9fc2f980396609f3bdffda",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
