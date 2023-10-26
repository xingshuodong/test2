import AuthContext from "@/contexts/AuthContext";
import  auth, { googleProvider } from "@/firebase/firebase.auth";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
    UserCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";

type EmailPassword = {
    email: string;
    password: any;
};

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    createUser: (credentials: EmailPassword) => Promise<UserCredential>;
    signIn: (credentials: EmailPassword) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logout: () => Promise<void>;
};


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const createUser = ({ email, password }: EmailPassword) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = ({ email, password }: EmailPassword) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // google login auth
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // logout auth
    const logout = () => {
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

    // console.log(value)



    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
