import { User } from "firebase/auth";
import { createContext } from "react";


const AuthContext = createContext<User | null>(null);

export default AuthContext;