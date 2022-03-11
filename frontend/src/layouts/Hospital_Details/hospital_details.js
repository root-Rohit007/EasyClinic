import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import Bill from "layouts/billing/components/Bill";
import { getHospitalbyID, clearErrors } from "Actions/hospitalActions";
import {
  getUserDetails,
  clearErrors as clearErrorsAdmin,
} from "Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const HospitalDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [admin, setadmin] = useState(false);

  const { error, hospital, loading } = useSelector(
    (state) => state.hospitalDetails
  );

  const {
    user,
    error: errorAdmin,
    loading: loadingAdmin,
  } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (errorAdmin) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrorsAdmin());
    }

    dispatch(getHospitalbyID(id));
  }, [dispatch, error, loadingAdmin, errorAdmin]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!loading ? (
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
                    Hospital : {hospital.name}
                  </MDTypography>

                  {/* <MDButton
                    onClick={() => {
                      if (!user.name) {
                        dispatch(getUserDetails(hospital.admin));
                      }
                      setadmin(!admin);
                    }}
                  >
                    Admin
                  </MDButton> */}
                </MDBox>

                <MDBox pt={3}>
                  <MDBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={1}
                    m={1}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Bill
                          name={hospital.name}
                          address={hospital.address}
                          GST={hospital.GST}
                          desclaimer={hospital.desclaimer}
                          termsAndConditions={hospital.termsAndConditions}
                          admin={hospital.admin}
                        />
                        {admin && loadingAdmin ? (
                          <h3>Loadin admin ...</h3>
                        ) : (
                          <div></div>
                        )}
                        {admin && user && !loadingAdmin ? (
                          <Bill name={user.name} email={user.email} />
                        ) : (
                          <div></div>
                        )}
                      </Grid>
                    </Grid>
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

export default HospitalDetails;
