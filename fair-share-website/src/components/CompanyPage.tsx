"use client";

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { firestore } from "@/firebase/firebase.config";
import addContributor from "@/functions/contributorFunctions";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import { userCollection, companyCollection } from "@/firebase/controller";

type Company = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const CompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [userData, setUserData] = useState<User[]>([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(companyCollection, (querySnapshot) => {
      const companiesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          id: doc.id,
        };
      });
      setCompanies(companiesData);
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
          name: data?.name,
          email: data?.email,
        };
      });
      setUserData(usersData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddContributor = () => {
    addContributor(selectedCompany, selectedUser, userData);
    // Clear the selected company and user
    setSelectedCompany("");
    setSelectedUser("");
  };

  return (
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
            {companies.map((company, index) => (
              <MenuItem key={index} value={company.id}>
                {company.name}
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
            onChange={(event) => setSelectedUser(event.target.value as string)}
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
      <Button onClick={handleAddContributor}>Add Contributor</Button>
    </Container>
  );
};

export default CompanyPage;
