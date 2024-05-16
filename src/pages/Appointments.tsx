import DataTable from "../ui/Table";
import { useNavigate } from "react-router-dom";
import { useGetAppointmentsByUserIdQuery } from "../Data/Api/ApiHandler";
import { useSelector } from "react-redux";
import { RootState } from "../Data/State/store";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "../ui/Spinner";
import { ErrorComp } from "../ui/ErrorComp";
import { IAppointment } from "../../Data/Interfaces";

const column = ["Date", "Doctor", "Status"];

export const Appointments = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userDetails._id);
  console.log(userId);
  const {
    data: appointments,
    isLoading: loadingAppointments,
    isError: appointmentsError,
  } = useGetAppointmentsByUserIdQuery(userId);

  if (loadingAppointments) return <Spinner />;
  if (appointments?.hasError || appointmentsError)
    return <ErrorComp message={appointments.message} />;

  const tableRow = appointments?.data?.map((el: IAppointment) => {
    return {
      id: el._id,
      date: new Intl.DateTimeFormat(["ban", "id"]).format(new Date(el.date)),
      doctor: el.doctorName,
      status: el.completed ? "done" : "pending",
    };
  });

  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-bold text-2xl">Appointments</h1>
        <FaPlus
          onClick={() => navigate("/schedule-appointment")}
          className="w-12 h-12 cursor-pointer rounded-full bg-secondary hover:bg-[#727ecd] p-3 fill-secondary_light"
        />
        {/* <Button style="rounded-full w-14 h-14 flex justify-center items-center">
          <AddIcon
            style={{
              fontSize: "2.4rem",
              fontWeight: "bolder",
              borderRadius: "100px",
            }}
            onClick={() => navigate("/schedule-appointment")}
          />
        </Button> */}
      </div>
      {tableRow.length < 1 ? (
        <div className="text-center mt-4">
          <span className="text-xl font-semibold text-secondary bg-secondary_light_2 p-2 px-3 rounded-full">
            No appointments yet, click on the "+" icon to create one !
          </span>
        </div>
      ) : (
        <DataTable column={column} row={tableRow} />
      )}
    </div>
  );
};
