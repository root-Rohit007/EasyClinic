import React, { useEffect, useState } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";

const PatientsAppointments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointMents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`/api/v5/getPatientsAppointments/${id}`);

      setAppointMents(res.data.appointments);
      console.log("res", res);
    };
    fetchAppointments();
  }, []);

  console.log("appointment", appointment);
  function Data() {
    const Author = ({ name, email }) => (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        {/* <MDAvatar src={image} name={name} size="sm" /> */}
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
      </MDBox>
    );

    const Job = ({ title, description }) => (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography
          display="block"
          variant="caption"
          color="red"
          fontWeight="medium"
        >
          {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    );

    return {
      columns: [
        { Header: "Doctor", accessor: "doctor", width: "45%", align: "left" },
        { Header: "Patient", accessor: "patient", align: "left" },
        { Header: "Date", accessor: "date", align: "center" },
        { Header: "Time", accessor: "time", align: "center" },
        { Header: "view", accessor: "view", align: "center" },
        { Header: "edit", accessor: "edit", align: "center" },
      ],

      rows: appointment.map((a) => {
        const dateString = new Date(a.date);

        const d = dateString.toDateString();
        const t = dateString.toTimeString().split(" ");

        return {
          doctor: (
            <Author
              name={a.doctorID.name}
              email={a.doctorID.degree.toString()}
            />
          ),
          patient: (
            <Author name={a.patientID.name} email={a.patientID.casePaperNo} />
          ),
          date: <Job title={d} />,
          time: <Job title={t[0]} />,
          view: (
            <MDButton
              onClick={() =>
                navigate(
                  `/patients/${a.patientID._id}/appointment_details/${a._id}`
                )
              }
            >
              View
            </MDButton>
          ),
          edit: (
            <MDButton
              onClick={() =>
                navigate(
                  `/patients/${a.patientID_id}/appointment_details/${a._id}/update`
                )
              }
            >
              Edit
            </MDButton>
          ),
        };
      }),
    };
  }

  if (appointment) {
    const { columns, rows } = Data();
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white">
                    Appointments
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder

                    // canSearch={true}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  } else {
    <DashboardLayout>
      <DashboardNavbar />
      <h1>Loading</h1>
    </DashboardLayout>;
  }
};

export default PatientsAppointments;
