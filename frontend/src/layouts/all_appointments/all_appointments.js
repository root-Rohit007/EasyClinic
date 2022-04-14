import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import { useSelector } from "react-redux";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

function All_appointmets() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(null);

  const userRole = useSelector((state) => state.user.user.role);
  const userID = useSelector((state) => state.user.user._id);
  const hospitalID = useSelector((state) => state.user.user.hospitalID);

  useEffect(() => {
    const fetchAppointmnets = async (role) => {
      if (role === "Doctor") {
        try {
          const res = await axios(`/api/v5/getDoctorsAppointments/${userID}`);
          console.log(res);
          setAppointments(res.data.appointments);
        } catch (err) {
          console.log("Error", console.log(err));
        }
      } else {
        try {
          const res = await axios(
            `/api/v5/getHospitalAppointments/${hospitalID}`
          );
          console.log(res);
          setAppointments(res.data.appointments);
        } catch (err) {
          console.log("Error", console.log(err));
        }
      }
    };
    fetchAppointmnets(userRole);
  }, []);

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
          color="text"
          fontWeight="medium"
        >
          {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    );

    return {
      columns: [
        { Header: "Patient", accessor: "patient", width: "25%", align: "left" },
        { Header: "Doctor", accessor: "doctor", width: "25%", align: "left" },
        { Header: "Date", accessor: "date", align: "center" },
        { Header: "Time", accessor: "time", align: "center" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "view", accessor: "view", align: "center" },
        { Header: "edit", accessor: "edit", align: "center" },
      ],

      rows: appointments.map((a) => {
        const dateString = new Date(a.date);
        const d = dateString.toDateString();
        const t = dateString.toTimeString().split(" ");

        return {
          patient: (
            <Author name={a.patientID.name} email={a.patientID.casePaperNo} />
          ),
          doctor: (
            <Author
              name={a.doctorID.name}
              email={a.doctorID.degree.toString()}
            />
          ),
          date: <Job title={d} />,
          time: <Job title={t[0]} />,
          status: <Job title={a.Status} />,
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
                  `/patients/${a.patientID._id}/appointment_details/${a._id}/update`
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

  if (userRole === "SuperAdmin") {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <h1>SuperAdmin</h1>
      </DashboardLayout>
    );
  }

  if (appointments) {
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
                    showTotalEntries={true}
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
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <h1>Loading</h1>
      </DashboardLayout>
    );
  }
}

export default All_appointmets;
