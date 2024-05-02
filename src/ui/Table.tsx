import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

const column = ["Date", "Doctor", "Status"];
const row = [
  { id: 1, date: "12/10/2024", doctor: "Dr. Ade", status: "pending" },
  { id: 2, date: "12/10/2024", doctor: "Dr. Ade", status: "done" },
  { id: 3, date: "12/10/2024", doctor: "Dr. Ade", status: "done" },
];

function DataTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {column.map((el, i) => (
              <TableCell key={i}>
                <Typography fontWeight={"bold"}>{el}</Typography>
              </TableCell>
            ))}
            <TableCell>
              <Typography fontWeight={"bold"}></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.doctor}</TableCell>
              <TableCell>{el.status}</TableCell>
              <TableCell>
                <RemoveRedEyeIcon
                  onClick={() => navigate(`/appointment/${el.id}`)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
