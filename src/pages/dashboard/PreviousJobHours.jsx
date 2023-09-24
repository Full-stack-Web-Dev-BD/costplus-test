import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
 

export default function PreviousJobHours({ previousJobHours }) {
  return (
    <TableContainer component={Paper}>
      <div className="p-3">
        <h4> Previous Jobs Hours Used </h4>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell align="right">Estimated Time to Spend</TableCell>
            <TableCell align="right">Time Used</TableCell>
            <TableCell align="right"> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {previousJobHours.map((row, id) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.jobTitle}
              </TableCell>
              <TableCell align="right">
                {row.estimatedTimeToSpend} <b>hrs</b>{" "}
              </TableCell>
              <TableCell align="right">
                {row.timeSpended > row.estimatedTimeToSpend
                  ? row.estimatedTimeToSpend
                  : row.timeSpended.toFixed(2)}{" "}
                <b>hrs</b>{" "}
              </TableCell>
              <TableCell align="right">
                <Link to={`/job-details/${row._id}`}>
                  <Button variant="outlined" color="primary">
                    Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {
            previousJobHours.length < 1 && 
            <td colSpan="4">
              <h3 className="m-4 text-center"> No Record Finded </h3>
            </td>
          } 
        </TableBody>
      </Table>
    </TableContainer>
  );
}
