"use client";
import React, { useEffect, useState } from "react";
import {
  companyCollection,
  getCollaborators,
  getCompanies,
} from "@/firebase/controller";
import { calculateSumValue } from "@/utils/utils";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableSkeleton from "./TableSkeleton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { onSnapshot } from "firebase/firestore";
type Collaborators = {
  email: string;
  shareholder: string;
  ownership: number;
  sharesOwned: number;
};
type Company = {
  id: string;
  name?: string;
};
export const CollaboratorTable = () => {
  const [rows, setRows] = useState<Collaborators[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companies, setCompanies] = useState<Company[]>([]);

  const listCompanies = async () => {
    const companies = await getCompanies();
    setCompanies(companies as any);
  };

  const listCollaborators = async () => {
    const collaborators = await getCollaborators(selectedCompany);
    setRows((collaborators as any).filter((e: Collaborators) => e.email));
  };

  useEffect(() => {
    if (selectedCompany) {
      listCollaborators();
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (!companies.length) {
      listCompanies();
    }
  }, []);

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="company-select-label">Select a Company</InputLabel>
        <Select
          labelId="company-select-label"
          id="company-select"
          value={selectedCompany}
          onChange={(event) => setSelectedCompany(event.target.value as string)}
          label="Select a Company"
        >
          {companies.map((company, index) => (
            <MenuItem key={index} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Shareholder</TableCell>
              <TableCell align="right">Ownership %</TableCell>
              <TableCell align="right">Shares Owned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!rows.length ? (
              <TableSkeleton columnNub={4} rowsNum={5} />
            ) : (
              rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">{row.shareholder}</TableCell>
                  <TableCell align="right">{row.ownership}%</TableCell>
                  <TableCell align="right">{row.sharesOwned}</TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                {calculateSumValue<Collaborators>("sharesOwned", rows)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
