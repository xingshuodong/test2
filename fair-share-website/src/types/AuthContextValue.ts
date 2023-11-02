import { User, UserCredential } from "firebase/auth";
import { EmailPasswordType } from "./EmailPassword";

export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    createUser: (credentials: EmailPasswordType) => Promise<UserCredential>;
    signIn: (credentials: EmailPasswordType) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logout: () => Promise<void>;
};