import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "./firebase.config"

export const userCollection = collection(firestore, "user");
export const companyCollection = collection(firestore, "company");

// Add a new user to the "user" collection
export const addUser = async (userData: any) => {

// Check if a document with the provided email already exists
    const querySnapshot = await getDocs(query(userCollection, where("email", "==", userData.email)));

    if (querySnapshot.empty) {
        // If the query result is empty, the email doesn't exist, so we can add the user
        const newUser = await addDoc(userCollection, {...userData});
        console.log("User added successfully to Firestore");
    } else {
        // If the query result is not empty, the email already exists
        console.log("User with this email already exists in Firestore.");
    }
}

// Add a new company to firestore
export const addHotel = async(companyData: any) =>{
    const newCompany = await addDoc(companyCollection, {...companyData})
    console.log(`New company added at ${newCompany.path}`)

}


