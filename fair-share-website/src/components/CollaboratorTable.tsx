"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
type rows = {
  country: string;
  shareholder: string;
  ownership: number;
  sharesOwned: number;
  value: number;
  investorCash: number;
};
function createData(
  country: string,
  shareholder: string,
  ownership: number,
  sharesOwned: number,
  value: number,
  investorCash: number
) {
  return { country, shareholder, ownership, sharesOwned, value, investorCash };
}

const initialRows = [
  createData("Australia", "Serge (CEO)", 50, 500, 500000, 5000),
  createData("Australia", "Akila", 37, 50, 14.0, 1848),
  createData("Australia", "Suez", 13, 20, 5, 660),
  createData("Australia", "Gurmukh", 0, 0, 0, 0),
];

export const CollaboratorTable = () => {
  const [rows, setRows] = React.useState<rows[]>(initialRows);
  const calculateSumValue = (name: keyof rows) =>
    rows.reduce((a, b) => {
      if (b.hasOwnProperty(name) && typeof b[name] === "number") {
        return a + (b[name] as number);
      }
      return 0;
    }, 0);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Shareholder</TableCell>
            <TableCell align="right">Ownership %</TableCell>
            <TableCell align="right">Shares Owned</TableCell>
            <TableCell align="right">Approx. Value</TableCell>
            <TableCell align="right">Investor cash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.country}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.country}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.shareholder}
              </TableCell>
              <TableCell align="right">{row.ownership}%</TableCell>
              <TableCell align="right">{row.sharesOwned}</TableCell>
              <TableCell align="right">${row.value}</TableCell>
              <TableCell align="right">${row.investorCash}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              {calculateSumValue("ownership")}
            </TableCell>
            <TableCell align="right">
              {calculateSumValue("sharesOwned")}
            </TableCell>
            <TableCell align="right">$ {calculateSumValue("value")}</TableCell>
            <TableCell align="right">
              $ {calculateSumValue("investorCash")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
