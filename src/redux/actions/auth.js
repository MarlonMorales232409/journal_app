import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../firebase/firebase";
import { types } from "../types/types";
import { notesLogoutCleaning } from "./notes";
import { finishLoading, startLoading } from "./ui";

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});

export const logout = () => ({
    type: types.logout,
});
// Login with google
export const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();

    return async (dispatch) => {
        try {
            const userData = await signInWithPopup(auth, googleProvider);
            const { user } = userData;
            dispatch(login(user.uid, user.displayName));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong, Verify your internet conection`,
            });
        }
    };
};

// Login with email and pasword

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const userData = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const { user } = userData;
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `The E-Mail or Password are incorrect`,
            });
        }
    };
};

// Create a new user with username email and password

export const startRegisterEmailPassword = (email, password, name) => {
    return async (dispatch) => {
        dispatch(startLoading());
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user.auth.currentUser, {
                    displayName: name,
                });
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch((e) => {
                console.log(e);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The user is already registered",
                });
            });
    };
};

// Logout from firebase

export const startLogout = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(logout());
        dispatch(notesLogoutCleaning());
    };
};
