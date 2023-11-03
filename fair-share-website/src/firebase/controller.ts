
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase.config";
import { AddCompanyType } from "@/types/AddCompany";
import { AddContributorType } from "@/types/AddContributor";


export const userCollection = collection(firestore, "user");
export const companyCollection = collection(firestore, "company");

// firestore().collection('users').doc(user.uid).collection("account").add({...});


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

// Add a new company to firestore
export const addCompany = async(companyData: AddCompanyType) =>{
    const newCompany = await addDoc(companyCollection, {...companyData})
    // console.log(`New company added at ${newCompany.path}`)

}

// Add a contributor to firestore
export const addcontributor = async(Data: AddContributorType) =>{
    const newCompany = await addDoc(companyCollection, {...Data})
}


