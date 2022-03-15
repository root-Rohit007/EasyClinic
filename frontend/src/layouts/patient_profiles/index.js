// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/patient_profiles/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPatientsDetail, clearErrors } from "Actions/patientActions";
import { useParams } from "react-router-dom";

function PatientDtails() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector(
    (state) => state.patientProfile
  );
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (patient) {
      console.log(patient);
    }

    dispatch(getPatientsDetail(id));
  }, [dispatch, error]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {patient ? (
        <Header>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              {/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid> */}
              <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="profile information"
                  // description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  info={{
                    Name: patient.name,
                    // fullName: user.name,
                    Mobile: patient.phone,
                    Email: patient.email,
                    Gender: patient.gender,

                    // Role: user.role,
                  }}
                  // social={[
                  //   {
                  //     link: "https://www.facebook.com/",
                  //     icon: <FacebookIcon />,
                  //     color: "facebook",
                  //   },
                  //   {
                  //     link: "https://twitter.com/",
                  //     icon: <TwitterIcon />,
                  //     color: "twitter",
                  //   },
                  //   {
                  //     link: "https://www.instagram.com/",
                  //     icon: <InstagramIcon />,
                  //     color: "instagram",
                  //   },
                  // ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                {/* <Divider orientation="vertical" sx={{ mx: 0 }} /> */}
              </Grid>
              <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Other information"
                  // description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  info={{
                    Age: patient.age,
                    BloodGroupt: patient.bloodGroup,
                    Height: patient.height + "cm",
                    Weight: patient.weight + "Kg",
                    // "Adhar no.": user.adhar,
                    // "Pan no.": user.pan,
                  }}
                  // social={[
                  //   {
                  //     link: "https://www.facebook.com/",
                  //     icon: <FacebookIcon />,
                  //     color: "facebook",
                  //   },
                  //   {
                  //     link: "https://twitter.com/",
                  //     icon: <TwitterIcon />,
                  //     color: "twitter",
                  //   },
                  //   {
                  //     link: "https://www.instagram.com/",
                  //     icon: <InstagramIcon />,
                  //     color: "instagram",
                  //   },
                  // ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                {/* <Divider orientation="vertical" sx={{ mx: 0 }} /> */}
              </Grid>
            </Grid>
          </MDBox>
          {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox> */}
          {/* <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                users={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                users={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                users={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                users={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox> */}
        </Header>
      ) : (
        <h1>Loading..</h1>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default PatientDtails;
