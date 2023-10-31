import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      "You must wrap your application with AuthProvider ot use the useAuth"
    );
  }
  return auth;
};

export default useAuth;