import React from "react";
import { AppointmentForm } from "../features/Appointment/AppointmentForm";
import { PageContainer } from "../ui/PageContainer";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export const Appointment = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="Appointment Details">
      <Card style="bg-white text-secondary font-bold">
        <div>
          <div className="flex gap-6">
            <h4>Date:</h4> <span>12/10/2024</span>
          </div>
          <div className="flex gap-6">
            <h4>Time:</h4> <span>12:10am</span>
          </div>
          <div className="flex gap-6">
            <h4>Reason:</h4> <span>Fever</span>
          </div>
          <div className="flex gap-6">
            <h4>Doctor:</h4> <span>Dr. Abdu</span>
          </div>
          <div className="flex gap-6">
            <h4>Status:</h4> <span>Done</span>
          </div>
          {/* vitals show on condition */}
          <div className="bg-green-200 mt-8 rounded-md p-2">
            <p>Vitals:</p>
            <div className="flex gap-6">
              <h4>Blood Pressure:</h4> <span>20/110</span>
            </div>
            <div className="flex gap-6">
              <h4>Sugar Level:</h4> <span>20/110</span>
            </div>
            <div className="flex gap-6">
              <h4>Heart Rate:</h4> <span>20/110</span>
            </div>
          </div>
        </div>
      </Card>

      {/* condition */}
      <Button
        onClick={() => navigate("/schedule-appointment?appointmentId=10")}
        style="w-full mt-7"
      >
        Edit
      </Button>
    </PageContainer>
  );
};
