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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

function DataTable({
  column,
  row,
}: {
  column: string[];
  row: { id: string; date: string; doctor: string; status: string }[];
}) {
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
          {row?.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.doctor}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full capitalize ${
                    el.status == "done" ? "bg-green-200" : "bg-yellow-200"
                  }`}
                >
                  {el.status}
                </span>
              </TableCell>
              <TableCell>
                <RemoveRedEyeIcon
                  className="cursor-pointer"
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
