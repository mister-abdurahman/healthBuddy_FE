import React from "react";
import DataTable from "../ui/Table";
import { Button } from "../ui/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export const Appointments = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-bold text-2xl">Appointments</h1>
        <Button style="rounded-full w-14 h-14 flex justify-center items-center">
          <AddIcon
            style={{ fontSize: "2.4rem", fontWeight: "bolder" }}
            onClick={() => navigate("/schedule-appointment")}
          />
        </Button>
      </div>
      <DataTable />
    </div>
  );
};
