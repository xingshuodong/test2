import { User, UserCredential } from "firebase/auth";
import { EmailPassword } from "./EmailPassword";

export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    createUser: (credentials: EmailPassword) => Promise<UserCredential>;
    signIn: (credentials: EmailPassword) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logout: () => Promise<void>;
};