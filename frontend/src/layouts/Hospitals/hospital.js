import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import Bill from "layouts/billing/components/Bill";
import Bill2 from "layouts/billing/components/Bill2";
import { getHospitals, clearErrors } from "Actions/hospitalActions";
import { useDispatch, useSelector } from "react-redux";

const Hospitals = () => {
  const dispatch = useDispatch();
  const { error, hospitals, loading } = useSelector((state) => state.hospitals);
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    dispatch(getHospitals());
  }, [dispatch, error]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {hospitals ? (
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
                    Hospitals
                  </MDTypography>
                </MDBox>

                <MDBox pt={3}>
                  <MDBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={1}
                    m={1}
                  >
                    {hospitals.map((h) => (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Bill
                            name={h.name}
                            address={h.address}
                            GST={h.GST}
                            desclaimer={h.desclaimer}
                            termsAndConditions={h.termsAndConditions}
                            admin={h.admin}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          {/* <Bill2
                            name={h.name}
                            address={h.address}
                            GST={h.GST}
                            desclaimer={h.desclaimer}
                            termsAndConditions={h.termsAndConditions}
                            admin={h.admin}
                          /> */}
                        </Grid>
                      </Grid>
                    ))}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      ) : (
        <h1> Loading </h1>
      )}

      <Footer />
    </DashboardLayout>
  );
};

export default Hospitals;
