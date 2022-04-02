import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const AppointmentDetails = () => {
  const { appointmentid } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  console.log(appointmentid);
  const [appointment, setAppointment] = useState(null);

  const role = useSelector((state) => state.user.user.role);
  console.log(role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/v5/getAppointmentByID/${appointmentid}`
        );
        setAppointment(res.data.appointment);
        console.log(res.data.appointment);
      } catch (error) {
        console.log(error);
        alert.error(error);
      }
    };
    fetchData();
  }, []);

  if (appointment) {
    const dateString = new Date(appointment.date);
    const d = dateString.toDateString();
    const t = dateString.toTimeString().split(" ");

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Paper elevation={10}>
          <div style={{ padding: "20px" }}>
            <br />
            <h1 style={{ color: "#4266d4" }}>Appointment Details</h1>
            <hr />
            <p>
              <b>Patient Name</b> : {appointment.patientID.name}
            </p>
            <p>
              <b>Doctor Name</b> : {appointment.doctorID.name}
            </p>
            <p>
              <b>Date</b> : {d}
            </p>
            <p>
              <b>Time</b> : {t[0]}
            </p>

            <p>
              <b>Current Height</b> :{" "}
              {appointment.currentHeight ? appointment.currentHeight : " "} cm
            </p>
            <p>
              <b>Current Weight</b> :{" "}
              {appointment.currentWeight ? appointment.currentWeight : " "} Kgs
            </p>
            <p>
              <b>SPO2</b> : {appointment.spo2 ? appointment.spo2 : " "} %
            </p>
            <p>
              <b>Blood Pressure</b> : {appointment.bp ? appointment.bp : " "}{" "}
              mmHg
            </p>
            <p>
              <b>Status</b> : {appointment.Status}
            </p>
          </div>
          <div style={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  onClick={() =>
                    navigate(
                      `/patients/${appointment.patientID._id}/appointment_details/${appointment._id}/update`
                    )
                  }
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  onClick={() =>
                    navigate(
                      `/patients/${appointment.patientID._id}/appointment_details/${appointment._id}/pdf`
                    )
                  }
                >
                  Prescription
                </Button>
              </Grid>
              {role === "Doctor" ? (
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="info"
                    onClick={() =>
                      navigate(
                        `/patients/${appointment.patientID._id}/appointment_details/${appointment._id}/prescription`
                      )
                    }
                  >
                    Attend
                  </Button>
                </Grid>
              ) : (
                " "
              )}
            </Grid>
          </div>
        </Paper>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }
};

export default AppointmentDetails;
