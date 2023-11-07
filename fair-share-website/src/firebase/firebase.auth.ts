import { getAuth, GoogleAuthProvider, onAuthStateChanged  } from "firebase/auth";
import app from "./firebase.config";


const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const userIdProvider = onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        return userId
        // Now you have the userId
    } else {
        console.log("User is not authenticated")
    }
});

export default auth;