import { User, UserCredential } from "firebase/auth";
import { createContext, Context } from "react";

type EmailPassword = {
    email: string;
    password: string;
};

interface AuthContextType {
    user: User | null;
    loading: boolean;
    createUser: (credentials: EmailPassword) => Promise<UserCredential>;
    signIn: (credentials: EmailPassword) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logout: () => Promise<void>;
}

const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);

export default AuthContext;