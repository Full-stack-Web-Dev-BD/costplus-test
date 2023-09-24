import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditMaterialModal from "./EditMaterialModal";

export default function MaterialTable({
  materialList,
  deleteMaterial,
  fetchMaterial,
}) {
  return (
    <TableContainer component={Paper}>
      <div className="p-3">
        <h4> Material List </h4>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center" title="Price Per Unit">
              Price P/U
            </TableCell>
            <TableCell align="center"> Unit Amount </TableCell>
            <TableCell align="center"> Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materialList.map((row, id) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.pricePerUnit}</TableCell>
              <TableCell align="center">{row.defaultUnitAmount}</TableCell>
              <TableCell align="center">
                <EditMaterialModal materialDetails={row} reFetchMaterials={fetchMaterial}  title={"Edit"} />
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={(e) => deleteMaterial(row._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {materialList.length < 1 && (
            <td colSpan="4">
              <h3 className="m-4 text-center"> No Record Finded </h3>
            </td>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
