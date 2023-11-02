import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase.config";

export const userCollection = collection(firestore, "user");

// Add a new user to the "user" collection
export const addUser = async (userData: any) => {
    const userRef = doc(firestore, "user", userData.userId);
    
    // Check if a document with the same userID already exists
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
        // If the user does not exist, add them
        await setDoc(userRef, { ...userData });
        console.log("New user added with ID:", userData.userId);
    } else {
        // User already exists
        console.log("User with ID", userData.userId, "already exists.");
    }
};
