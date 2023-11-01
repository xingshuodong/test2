import { FC, ReactNode, useEffect, useState } from "react";
import { User, UserCredential } from "firebase/auth";
import auth, { googleProvider } from "@/firebase/firebase.auth";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import AuthContext from "@/contexts/AuthContext";
import { AuthContextValue} from "@/types/AuthContextValue";
import { EmailPassword } from "@/types/EmailPassword";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const createUser = ({ email, password }: EmailPassword): Promise<UserCredential> => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = ({ email, password }: EmailPassword): Promise<UserCredential> => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = (): Promise<UserCredential> => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logout = (): Promise<void> => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value: AuthContextValue = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;