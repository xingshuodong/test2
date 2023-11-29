import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";
type TableSkeletonProps = {
  rowsNum: number;
  columnNub: number;
};
const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rowsNum,
  columnNub,
}) => {
  return [...Array(rowsNum)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(columnNub)].map((_, indexColumn) => (
        <TableCell key={indexColumn} component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableSkeleton;
