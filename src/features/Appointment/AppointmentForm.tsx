import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { AccountCircle } from "@mui/icons-material";

export const AppointmentForm = ({
  appointmentId,
}: {
  appointmentId?: string | null;
}) => {
  console.log(appointmentId);
  const { register, handleSubmit, getValues, reset, formState }: any = useForm({
    defaultValues: {
      date: "",
      time: "",
      reason: "",
      doctor: "null",
    },
  });

  function submitForm(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white my-4 rounded-md shadow-md mx-auto px-5 py-3 pb-5 flex flex-col gap-8"
    >
      <TextField
        id="standard-basic"
        label="Date"
        variant="standard"
        type="date"
        className="w-full"
        InputLabelProps={{
          shrink: true,
        }}
        required
        {...register("date")}
      />

      <div>
        <TextField
          id="standard-basic"
          label="Time"
          variant="standard"
          type="time"
          className="w-full"
          InputLabelProps={{
            shrink: true,
          }}
          required
          {...register("time")}
        />
        <span className="text-xs text-yellow-500">
          Note: doctor might adjust appointment time
        </span>
      </div>
      <TextField
        variant="standard"
        id="outlined-select-currency"
        select
        label="Select Doctor"
        placeholder="Select Doctor"
        required
        className="w-full"
        {...register("doctor")}
      >
        <MenuItem value={"null"}>--Select Doctor--</MenuItem>
        {[{ value: 5, label: "aba" }].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-basic"
        label="Reason"
        variant="standard"
        className="w-full"
        required
        {...register("reason")}
      />
      <Button>
        <span>{appointmentId ? "Re-Schedule" : "Schedule"}</span>
      </Button>
    </form>
  );
};
