"use client";
import { getCollaborators } from "@/firebase/controller";
import { calculateSumValue } from "@/utils/utils";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import TableSkeleton from "./TableSkeleton";
type rows = {
  country: string;
  shareholder: string;
  ownership: number;
  sharesOwned: number;
};

export const CollaboratorTable = () => {
  const [rows, setRows] = React.useState<rows[]>([]);

  React.useEffect(() => {
    if (!rows.length) {
      getData();
    }
  }, []);
  const getData = async () => {
    const collaborators = await getCollaborators();
    setRows(collaborators as any);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Shareholder</TableCell>
            <TableCell align="right">Ownership %</TableCell>
            <TableCell align="right">Shares Owned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!rows.length ? (
            <TableSkeleton columnNub={6} rowsNum={5} />
          ) : (
            rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.country}
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
              {calculateSumValue<rows>("sharesOwned", rows)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
