"use client";

import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase.config";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import { userCollection, companyCollection } from "@/firebase/controller";


type Task = {
  id: string;
  name?: string;
};

type User = {
  id: string;
  email: string;
};

export const CompanyPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(""); // To store the selected user ID
  const [selectedCompany, setSelectedCompany] = useState<string>(""); // To store the selected company ID

  useEffect(() => {
    const unsubscribe = onSnapshot(companyCollection, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          id: doc.id,
        };
      });
      setTasks(tasksData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(userCollection, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data?.email,
        };
      });
      setUserData(usersData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addContributor = async (companyId: string, userId: string) => {

    // Create a reference to the selected company document
    const companyDocRef = doc(firestore, "company", companyId);
    const contributorCollectionRef = collection(companyDocRef, "contributor");
  
    // Find the user's data by their ID
    const selectedUser = userData.find((user) => user.id === userId);

    if (!selectedUser) {
      console.error("User not found.");
      return;
    }

    // Create a contributor data object
    const contributorData = {
      // user_name: selectedUser.name,
      email: selectedUser.email,
    };

    try {
      // Add the contributor document to the "contributor" subcollection
      const contributorDocRef = doc(contributorCollectionRef, userId);
      await setDoc(contributorDocRef, contributorData);
      console.log("User added as a contributor to the company.");
    } catch (error) {
      console.error("Error adding user as a contributor:", error);
    }
    setSelectedCompany("");
    setSelectedUser("");
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <div style={{ marginBottom: "5px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="company-select-label">Select a Company</InputLabel>
            <Select
              labelId="company-select-label"
              id="company-select"
              value={selectedCompany}
              onChange={(event) =>
                setSelectedCompany(event.target.value as string)
              }
              label="Select a Company"
            >
              {tasks.map((task, index) => (
                <MenuItem key={index} value={task.id}>
                  {task.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <br />

        <div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="user-select-label">Select a User</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              value={selectedUser}
              onChange={(event) =>
                setSelectedUser(event.target.value as string)
              }
              label="Select a User"
            >
              {userData.map((user, index) => (
                <MenuItem key={index} value={user.id}>
                  {user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <br />

        <Button onClick={() => addContributor(selectedCompany, selectedUser)}>
          Add Contributor
        </Button>
      </Container>
    </>
  );
};