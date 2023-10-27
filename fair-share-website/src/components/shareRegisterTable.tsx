import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  ownership: number,
  sharesOwned: number,
  value: number,
  
) {
  return { name, ownership, sharesOwned, value};
}

const rows = [
  createData('Serge (CEO)', 25, 9.5, 1250),
  createData('CTO', 10, 3.8, 500),
  createData('CGO', 10, 3.8, 500),
  createData('CMO', 5, 1.9, 250),
  createData('Akila', 37, 14.0, 1848),
  createData('Suez', 13, 5, 660),
  createData('Gurmukh', 0, 0, 0),
];

export const ShareRegisterTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Ownership</TableCell>
            <TableCell align="right">SharesOwned</TableCell>
            <TableCell align="right">Approx. Value</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.ownership}%</TableCell>
              <TableCell align="right">{row.sharesOwned}</TableCell>
              <TableCell align="right">${row.value}</TableCell>
              
            </TableRow>
          ))}
          <TableRow>
            <TableCell >Total</TableCell>
            <TableCell align="right">100%</TableCell>
            <TableCell align="right">38</TableCell>
            <TableCell align="right">$5000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}