import { PageContainer } from "../ui/PageContainer";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsByIdQuery,
} from "../Data/Api/ApiHandler";
import { appendAM_PM } from "../utils/helper";
import { useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import dayjs from "dayjs";
import { Spinner } from "../ui/Spinner";
import { ErrorComp } from "../ui/ErrorComp";

export const Appointment = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: appointment,
    isLoading: loadingAppointment,
    isError: appointmentError,
  } = useGetAppointmentsByIdQuery(id);
  const [deleteAppointment, { isLoading: deletingAppointment }] =
    useDeleteAppointmentMutation();

  function handleDelete() {
    deleteAppointment(id).then((res) => {
      if (res?.data?.data?.hasError) return alert(res.data.data.message);
      alert("Appointment Successfully deleted");
      navigate("/appointments");
    });
  }

  if (loadingAppointment) return <Spinner />;
  if (appointment?.hasError || appointmentError)
    return <ErrorComp message={appointment.message} />;

  return (
    <PageContainer title="Appointment Details">
      <Card style="bg-white text-secondary font-bold">
        <div>
          <div className="flex gap-6">
            <h4>Date:</h4>{" "}
            <span>
              {dayjs(appointment?.data?.date).format("MMMM DD, YYYY")}
            </span>
          </div>
          <div className="flex gap-6">
            <h4>Time:</h4> <span>{appendAM_PM(appointment?.data?.time)}</span>
          </div>
          <div className="flex gap-6">
            <h4>Reason:</h4> <span>{appointment?.data?.reason}</span>
          </div>
          <div className="flex gap-6">
            <h4>Doctor:</h4> <span>{appointment?.data?.doctorName}</span>
          </div>
          <div className="flex gap-6">
            <h4>Status:</h4>{" "}
            <span>{appointment?.data?.completed ? "Done" : "Pending"}</span>
          </div>
          <div>
            {appointment.data.completed && (
              <div className="flex gap-6">
                <h4>Note: </h4>
                <span>{appointment?.data?.doctorNote}</span>
              </div>
            )}
          </div>
          {/* vitals show on condition */}
          {appointment.data.completed && (
            <div className="bg-green-200 mt-8 rounded-md p-2">
              <p>Vitals:</p>
              <div className="flex gap-6">
                <h4>Blood Pressure:</h4>{" "}
                <span>{appointment?.data?.vitals?.bloodPressure}</span>
              </div>
              <div className="flex gap-6">
                <h4>Sugar Level:</h4>{" "}
                <span>{appointment?.data?.vitals?.sugarLevel}</span>
              </div>
              <div className="flex gap-6">
                <h4>Heart Rate:</h4>{" "}
                <span>{appointment?.data?.vitals?.heartRate}</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* condition */}
      {appointment?.data?.completed ? (
        <Button onClick={() => navigate(-1)} style="w-full mt-7">
          Go Back
        </Button>
      ) : (
        <div className="flex gap-8">
          <Button
            onClick={() => navigate(`/schedule-appointment?id=${id}`)}
            style="w-full mt-7"
          >
            Edit
          </Button>
          <Button onClick={() => handleOpen()} style="w-full mt-7">
            Delete
          </Button>
        </div>
      )}

      <ConfirmModal
        open={open}
        handleClose={handleClose}
        title={"Are you sure?"}
        body={"Note: Action cannot be reversed!"}
        action={handleDelete}
      />
    </PageContainer>
  );
};
