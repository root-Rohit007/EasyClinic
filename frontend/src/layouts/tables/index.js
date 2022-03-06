// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import usersTableData from "layouts/tables/data/usersTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
// import patientTableData from "layouts/tables/data/patientTableData";

import { useEffect, useState } from "react";
import { getAllUsers, clearErrors } from "Actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import Test from "Component/Test/test";

function Tables() {
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  // const { columns: tCol, rows:tRow } = patientTableData();

  const dispatch = useDispatch();
  const { error, loading, users } = useSelector((state) => state.allUsers);
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
        { Header: "user", accessor: "user", width: "45%", align: "left" },
        { Header: "designation", accessor: "role", align: "left" },
        { Header: "status", accessor: "status", align: "center" },
        { Header: "view", accessor: "view", align: "center" },
        { Header: "edit", accessor: "edit", align: "center" },
      ],

      rows: users.map((u) => ({
        user: <Author name={u.name} email={u.email} />,
        role: <Job title={u.role} />,
        status: (
          <MDBox ml={-1}>
            {u.isActive ? (
              <MDBadge
                badgeContent="active"
                color="success"
                variant="gradient"
                size="sm"
              />
            ) : (
              <MDBadge
                badgeContent="inactive"
                color="error"
                variant="gradient"
                size="sm"
              />
            )}
          </MDBox>
        ),
        view: (
          <MDTypography
            component="a"
            href={"/allusers/" + u._id}
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

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers(hospitalID));
  }, [dispatch, error]);

  if (!loading && users) {
    const { columns, rows } = Data();
    console.log(users);
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
                    Users
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

export default Tables;
