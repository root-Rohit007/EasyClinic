// @mui material components
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import usersTableData from "layouts/tables/data/usersTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

import { useSelector } from "react-redux";
// import { clearErrors, getALLPatients } from "Actions/patientActions";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAlert } from "react-alert";
// import {} from "Actions/"

function Patients() {
  const alert = useAlert();
  const [searchPhone, setSearchPhone] = useState("");
  const [patient, setPatient] = useState([]);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { error, loading, patients } = useSelector(
  //   (state) => state.patientDetails
  // );
  const hospitalID = useSelector((state) => state.user.user.hospitalID);

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
        { Header: "patient", accessor: "patient", width: "45%", align: "left" },
        { Header: "phone", accessor: "phone", align: "left" },
        { Header: "Gender", accessor: "gender", align: "center" },
        { Header: "Age", accessor: "age", align: "center" },
        { Header: "View", accessor: "view", align: "center" },
        { Header: "edit", accessor: "edit", align: "center" },
      ],

      rows: patient.map((p) => ({
        patient: <Author name={p.name} email={p.casePaperNo} />,
        phone: <Job title={p.phone} />,
        gender: <Job title={p.gender}></Job>,
        age: <Job title={p.age} />,
        view: (
          <MDButton onClick={() => navigate("/patients/" + p._id)}>
            View
          </MDButton>
          // <MDTypography
          //   component="a"
          //   href={"/patients/" + p._id}
          //   variant="caption"
          //   color="text"
          //   fontWeight="medium"
          // >
          //   View
          // </MDTypography>
        ),
        edit: (
          <MDButton onClick={() => navigate("/patients/" + p._id + "/update")}>
            Edit
          </MDButton>
        ),
      })),
    };
  }

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     dispatch(clearErrors());
  //   }
  //   if (patients) {
  //     console.log(patients);
  //   }
  //   dispatch(getALLPatients(hospitalID));
  // }, [dispatch, error]);

  useEffect(() => {
    console.log("run");
    const delaySearchFun = setTimeout(() => {
      console.log(searchPhone);
      if (searchPhone.length > 0) {
        axios
          .post(
            "/api/v4/getpatientsByPhone",
            { hospitalID, phoneS: searchPhone },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log("res", res);
            setPatient(res.data.patients);
            if (res.data.patients.length === 0) {
              alert.error("No records found");
            }
          });
      }
    }, 1000);
    return () => clearTimeout(delaySearchFun);
  }, [searchPhone]);

  if (patient) {
    const { columns, rows } = Data();
    console.log(patient);

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
                    Patients
                  </MDTypography>
                  <MDButton onClick={() => navigate("/patients/create")}>
                    create Patients
                  </MDButton>
                </MDBox>
                <MDBox mx={3} mt={4}>
                  <TextField
                    id="standard-basic"
                    label="Search-by-mobile"
                    variant="standard"
                    onChange={(e) => setSearchPhone(e.target.value)}
                  />
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
            {/* <Grid item xs={12}>
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
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
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

export default Patients;
