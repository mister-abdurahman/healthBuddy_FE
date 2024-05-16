import { AppointmentForm } from "../features/Appointment/AppointmentForm";
import { PageContainer } from "../ui/PageContainer";
import { useLocation } from "react-router-dom";

export const CreateAppointment = () => {
  const location = useLocation();
  const appointmentId = new URLSearchParams(location?.search)?.get("id");
  return (
    <PageContainer
      title={`${
        appointmentId ? "Edit Appointment" : "Schedule an Appointment"
      }`}
    >
      <AppointmentForm appointmentId={appointmentId} />
    </PageContainer>
  );
};
