// @mui material components
import { useEffect } from "react";
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
import patientTableData from "layouts/patients/data/patientTableData";

import { useDispatch, useSelector } from "react-redux";
// import {} from "Actions/"

function Tables() {
  // const { columns, rows } = patientTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  //   const { columns: tCol, rows:tRow } = patientTableData();

  const dispatch = useDispatch();
  const { error, loading, patients } = useSelector(
    (state) => state.patientDetails
  );
  const hospitalID = useSelector((state) => state.user.user.hospitalID);

  function data() {
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

      rows: patients.map((p) => ({
        patient: <Author name={p.name} email={p.email} />,
        phone: <Job title={p.phone} />,
        gender: <Job title={p.gender}></Job>,
        age: <Job title={p.age} />,
        view: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            View
          </MDTypography>
        ),
        edit: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      })),
    };
  }

  // useEffect(()=> {
  //   if(error){
  //     console.log(error);
  //     dispatch(clear)
  //   }

  // })

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
              >
                <MDTypography variant="h6" color="white">
                  Patients
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  // table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
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
}

export default Tables;
