import AuthContext from "@/contexts/AuthContext";
import auth, { googleProvider } from "@/firebase/firebase.auth";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";

type EmailPassword = {
    email: string;
    password: string;
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

    const profileUpdate = async (updateUser: Record<string, any> = {}) => {
        setLoading(true);
        const currentUser = auth.currentUser;
        if (currentUser) {
            await updateProfile(currentUser, updateUser);
            setUser((preUser) => {
                if (preUser) {
                    return { ...preUser, ...updateUser };
                } else {
                    return null;
                }
            });
        }
    };



    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

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

    const value: {
        user: User | null;
        loading: boolean;
        createUser: (credentials: EmailPassword) => Promise<UserCredential>;
        signIn: (credentials: EmailPassword) => Promise<UserCredential>;
        profileUpdate: (updateUser?: Record<string, any>) => Promise<void>;
        googleLogin: () => Promise<UserCredential>;
        logout: () => Promise<void>;
    } = {
        user,
        loading,
        createUser,
        signIn,
        profileUpdate,
        googleLogin,
        logout,
    };

    // console.log(value)



    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
