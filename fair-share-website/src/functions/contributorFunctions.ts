import { Firestore, doc, collection, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase.config'; // Import your Firestore instance

interface UserData {
  id: string;
  name: string;
  email: string;
}

const addContributor = async (selectedCompany: string, selectedUser: string, userData: UserData[]) => {
  if (!selectedCompany || !selectedUser) {
    console.error('Please select a company and a user.');
    return;
  }

  const companyDocRef = doc(firestore, 'company', selectedCompany);
  const contributorCollectionRef = collection(companyDocRef, 'contributor');

  const selectedUserData = userData.find((user) => user.id === selectedUser);

  if (!selectedUserData) {
    console.error('User not found.');
    return;
  }

  const contributorData = {
    email: selectedUserData.email,
  };

  try {
    const contributorDocRef = doc(contributorCollectionRef, selectedUser);
    await setDoc(contributorDocRef, contributorData);
    console.log('User added as a contributor to the company.');
  } catch (error) {
    console.error('Error adding user as a contributor:', error);
  }
};

export default addContributor;

