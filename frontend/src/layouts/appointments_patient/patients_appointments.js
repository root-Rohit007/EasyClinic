import React, { useEffect, useState } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import axios from "axios";
import { useParams } from "react-router-dom";

const PatientsAppointments = () => {
  const { id } = useParams();
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
  // function Data() {
  //     const Author = ({ name, email }) => (
  //       <MDBox display="flex" alignItems="center" lineHeight={1}>
  //         {/* <MDAvatar src={image} name={name} size="sm" /> */}
  //         <MDBox ml={2} lineHeight={1}>
  //           <MDTypography
  //             display="block"
  //             variant="button"
  //             fontWeight="medium"
  //           >
  //             {name}
  //           </MDTypography>
  //           <MDTypography variant="caption">{email}</MDTypography>
  //         </MDBox>
  //       </MDBox>
  //     );

  //     const Job = ({ title, description }) => (
  //       <MDBox lineHeight={1} textAlign="left">
  //         <MDTypography
  //           display="block"
  //           variant="caption"
  //           color="text"
  //           fontWeight="medium"
  //         >
  //           {title}
  //         </MDTypography>
  //         <MDTypography variant="caption">{description}</MDTypography>
  //       </MDBox>
  //     );

  //     return {
  //       columns: [
  //         { Header: "Doctor", accessor: "doctor", width: "45%", align: "left" },
  //         { Header: "Patient", accessor: "patient", align: "left" },
  //         { Header: "Mobile no.", accessor: "mobile", align: "center" },
  //         { Header: "status", accessor: "status", align: "center" },
  //         { Header: "view", accessor: "view", align: "center" },
  //         // { Header: "edit", accessor: "edit", align: "center" },
  //       ],

  //       rows: users.map((u) => ({
  //         user: <Author name={u.name} email={u.email} />,
  //         role: <Job title={u.role} />,
  //         mobile: <Job title={u.phone} />,
  //         status: (
  //           <MDBox ml={-1}>
  //             {u.isActive ? (
  //               <MDBadge
  //                 badgeContent="active"
  //                 color="success"
  //                 variant="gradient"
  //                 size="sm"
  //               />
  //             ) : (
  //               <MDBadge
  //                 badgeContent="inactive"
  //                 color="error"
  //                 variant="gradient"
  //                 size="sm"
  //               />
  //             )}
  //           </MDBox>
  //         ),
  //         view: (
  //           <MDTypography
  //             component="button"
  //             variant="caption"
  //             color="text"
  //             fontWeight="medium"
  //             onClick={() => navigate("/allusers/" + u._id)}
  //           >
  //             View
  //           </MDTypography>
  //         ),
  //         edit: (
  //           <MDTypography
  //             component="button"
  //             // href="#"
  //             variant="caption"
  //             color="text"
  //             fontWeight="medium"
  //             onClick={() => navigate("/allusers/" + u._id + "/update")}
  //           >
  //             Edit
  //           </MDTypography>
  //         ),
  //       })),
  //     };
  //   }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox pt={6} pb={3}>
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
      </MDBox>  */}
      <Footer />
    </DashboardLayout>
  );
};

export default PatientsAppointments;
