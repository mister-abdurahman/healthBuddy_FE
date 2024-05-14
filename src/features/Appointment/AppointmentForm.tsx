import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import {
  useCreateAppointmentMutation,
  useGetAppointmentsByIdQuery,
  useGetDoctorsQuery,
  useUpdateAppointmentMutation,
} from "../../Data/Api/ApiHandler";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { formatTime } from "../../utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "../../Data/State/store";
import { useNavigate } from "react-router-dom";
import { SpinnerMini } from "../../ui/SpinnerMini";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "../../ui/Spinner";
import { ErrorComp } from "../../ui/ErrorComp";

const schema = yup.object().shape({
  date: yup.string().required(),
  time: yup.string().required(),
  doctor: yup.string().required(),
  reason: yup.string().required(),
});

export const AppointmentForm = ({
  appointmentId,
}: {
  appointmentId?: string | null;
}) => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userDetails._id);
  const {
    data: appointment,
    isLoading: loadingAppointment,
    isError: appointmentError,
  } = useGetAppointmentsByIdQuery(appointmentId);
  const [createAppointment, { isLoading: creatingAppointment }] =
    useCreateAppointmentMutation();
  const [updateAppointment, { isLoading: updatingAppointment }] =
    useUpdateAppointmentMutation();
  const {
    data: doctors,
    isLoading: loadingDoctors,
    isError: doctorsError,
  } = useGetDoctorsQuery("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  }: any = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date:
        (appointment?.data &&
          dayjs(appointment?.data?.date).format("YYYY-MM-DD")) ||
        "",
      time: formatTime(appointment?.data?.time) || "",
      doctor: appointment?.data?.doctorId || "",
      reason: appointment?.data?.reason || "",
    },
  });
  const today = new Date();
  const handleInputDateChange = (e) => {
    // setDateInputErr("");
    setError("date", "");
    const selectedDate = new Date(e.target.value);
    if (today > selectedDate && today.getDate() !== selectedDate.getDate()) {
      setError("date", {
        type: "custom",
        message: "You cannot create appointment for a past date!",
      });
      // setDateInputErr("You cannot create appointment for a past date!");
      setValue("date", "");
    }
  };

  const handleInputTimeChange = (e) => {
    setError("time", "");
    const hr = +e.target.value.split(":")[0];
    console.log(hr);
    // const selectedDate = new Date(e.target.value);
    if (hr < 8 || hr > 17) {
      setError("time", {
        type: "custom",
        message: "Select a time between 8:00am and 5:00pm",
      });
      // setDateInputErr("You cannot create appointment for a past date!");
      setValue("time", "");
    }
  };

  if (appointmentId && loadingAppointment) return <Spinner />
  if (appointmentId && loadingDoctors) return <Spinner />

  if (appointment?.hasError || appointmentError)
    return <ErrorComp message={"error occured while fetching appointment"} />;
  if (doctors?.hasError || doctorsError)
    return <ErrorComp message={"error occured while fetching doctor"} />;

  function submitForm(data) {
    // console.log(data);
    const selectedDoc = doctors.data.find((el) => el._id === data.doctor);
    const toSubmit = {
      userId,
      date: data.date,
      time: data.time,
      reason: data.reason,
      doctorId: data.doctor,
      doctorName:
        selectedDoc.title +
        " " +
        selectedDoc.lastName +
        " " +
        selectedDoc.firstName,
    };
    console.log(toSubmit);
    appointmentId
      ? updateAppointment({ id: appointmentId, appointment: toSubmit }).then(
          () => {
            alert("Updated Successfully");
            navigate("/appointments");
          }
        )
      : createAppointment(toSubmit).then((res) => {
          console.log(res);
          if (res?.error?.data?.hasError)
            return alert(res?.error?.data?.message);
          else alert("Created Successfully");
          navigate("/appointments");
        });
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white my-4 rounded-md shadow-md mx-auto px-5 py-3 pb-5 flex flex-col gap-8"
    >
      <div>
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
          {...register("date", {
            onChange: handleInputDateChange,
          })}
        />
        <span className="text-red-500 text-xs">{errors?.date?.message}</span>
        {/* {dateInputErr && (
          <span className="text-red-500 text-xs">{dateInputErr}</span>
        )} */}
      </div>

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
          {...register("time", {
            onChange: handleInputTimeChange,
          })}
        />
        <div className="flex justify-between flex-wrap">
          <span className="text-xs text-yellow-500">
            Note: doctor might adjust appointment time
          </span>
          <span className="text-red-500 text-xs">{errors?.time?.message}</span>
        </div>
      </div>

      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Doctor"
          defaultValue={appointment?.data?.doctorId || ""}
          placeholder="Select Doctor"
          {...register("doctor")}
        >
          {/* <MenuItem value={"111"}>--test Doctor--</MenuItem> */}
          {doctors?.data?.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.title} {option.lastName} {option.firstName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <TextField
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
      </TextField> */}

      <TextField
        id="standard-basic"
        label="Reason"
        variant="standard"
        className="w-full"
        required
        {...register("reason")}
      />
      <Button>
        <span className="text-center">
          {updatingAppointment || creatingAppointment ? (
            <SpinnerMini />
          ) : appointmentId ? (
            "Re-Schedule"
          ) : (
            "Schedule"
          )}
        </span>
      </Button>
    </form>
  );
};
