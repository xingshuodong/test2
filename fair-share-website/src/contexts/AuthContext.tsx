import { AuthContextValue } from "@/types/AuthContextValue";
import { createContext, Context } from "react";


const AuthContext: Context<AuthContextValue | null> = createContext<AuthContextValue | null>(null);

export default AuthContext;