import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { startLoadingNotes } from "../redux/actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch]);

    if (checking) {
        return <h1>Loading...</h1>;
    }

    return (
        <Routes>
            <Route
                path="/auth/*"
                element={
                    isLoggedIn ? (
                        <Navigate to={"/"} replace={true} />
                    ) : (
                        <AuthRouter />
                    )
                }
            />
            <Route
                path="/"
                element={
                    isLoggedIn ? (
                        <JournalScreen />
                    ) : (
                        <Navigate to={"/auth/login"} replace={true} />
                    )
                }
            />
        </Routes>
    );
};
