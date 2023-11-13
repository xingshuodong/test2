import { Firestore, doc, collection, setDoc } from "firebase/firestore";

interface UserData {
  id: string;
  name?: string;
  email: string;
}

const addContributor = async (
  firestore: Firestore,
  selectedCompany: string,
  selectedUser: string,
  userData: UserData[]
) => {
  if (!selectedCompany || !selectedUser) {
    console.error("Please select a company and a user.");
    return;
  }

  // Create a reference to the selected company document
  const companyDocRef = doc(firestore, "company", selectedCompany);
  const contributorCollectionRef = collection(companyDocRef, "contributor");

  // Find the user's data by their ID
  const selectedUserData = userData.find((user) => user.id === selectedUser);

  if (!selectedUserData) {
    console.error("User not found.");
    return;
  }

  // Create a contributor data object
  const contributorData = {
    email: selectedUserData.email,
  };

  try {
    // Add the contributor document to the "contributor" subcollection
    const contributorDocRef = doc(contributorCollectionRef, selectedUser);
    await setDoc(contributorDocRef, contributorData);
    console.log("User added as a contributor to the company.");
  } catch (error) {
    console.error("Error adding user as a contributor:", error);
  }
};

export default addContributor;
