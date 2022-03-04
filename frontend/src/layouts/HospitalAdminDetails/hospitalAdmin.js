import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { useParams } from "react-router-dom";

const HospitalAdmin = () => {
  const { id } = useParams();
  console.log(id);
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
                  Admin Details
                </MDTypography>
              </MDBox>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MDBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={1}
                    m={1}
                  >
                    <h1>H!</h1>
                    <h1>H!</h1>
                  </MDBox>
                </Grid>
                <Grid item xs={6}>
                  <MDBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={1}
                    m={1}
                  >
                    <h1>H@</h1>
                    <h1>H@</h1>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default HospitalAdmin;
