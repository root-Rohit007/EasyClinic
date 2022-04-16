// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import React, { useEffect } from "react";
// import MDBox from "components/MDBox";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import MDTypography from "components/MDTypography";
// import Footer from "examples/Footer";
// import Bill from "layouts/billing/components/Bill";
// import { getHospitals, clearErrors } from "Actions/hospitalActions";
// import { useDispatch, useSelector } from "react-redux";
// import MDButton from "components/MDButton";
// import { useNavigate } from "react-router-dom";

// const Hospitals = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { error, hospitals, loading } = useSelector((state) => state.hospitals);
//   useEffect(() => {
//     if (error) {
//       console.log(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getHospitals());
//   }, [dispatch, error]);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       {!loading ? (
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={6}>
//             <Grid item xs={12}>
//               <Card>
//                 <MDBox
//                   mx={2}
//                   mt={-3}
//                   py={3}
//                   px={2}
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                   display="flex"
//                   justifyContent="space-between"
//                 >
//                   <MDTypography variant="h6" color="white">
//                     Hospitals
//                   </MDTypography>
//                   <MDButton onClick={() => navigate("/hospitals/create")}>
//                     create hospital
//                   </MDButton>
//                 </MDBox>

//                 <MDBox pt={3}>
//                   <MDBox
//                     component="ul"
//                     display="flex"
//                     flexDirection="column"
//                     p={1}
//                     m={1}
//                   >
//                     {hospitals.map((h) => (
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Bill
//                             name={h.name}
//                             address={h.address}
//                             GST={h.GST}
//                             desclaimer={h.desclaimer}
//                             termsAndConditions={h.termsAndConditions}
//                             admin={h.admin}
//                           />
//                         </Grid>
//                         <Grid item xs={6}>
//                           {/* <Bill2
//                             name={h.name}
//                             address={h.address}
//                             GST={h.GST}
//                             desclaimer={h.desclaimer}
//                             termsAndConditions={h.termsAndConditions}
//                             admin={h.admin}
//                           /> */}
//                         </Grid>
//                       </Grid>
//                     ))}
//                   </MDBox>
//                 </MDBox>
//               </Card>
//             </Grid>
//           </Grid>
//         </MDBox>
//       ) : (
//         <h1> Loading </h1>
//       )}

//       <Footer />
//     </DashboardLayout>
//   );
// };

// export default Hospitals;

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
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import usersTableData from "layouts/tables/data/usersTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
// import patientTableData from "layouts/tables/data/patientTableData";

import { useEffect, useState } from "react";
import { getHospitals, clearErrors } from "Actions/hospitalActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import Test from "Component/Test/test";
import MDButton from "components/MDButton";

function HospitalTable() {
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  // const { columns: tCol, rows:tRow } = patientTableData();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, hospitals, loading } = useSelector((state) => state.hospitals);

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
        { Header: "Name", accessor: "name", width: "45%", align: "left" },
        { Header: "Address", accessor: "address", align: "left" },
        { Header: "GST", accessor: "gst", align: "center" },
        { Header: "view", accessor: "view", align: "center" },
        { Header: "edit", accessor: "edit", align: "center" },
      ],

      rows: hospitals.map((h) => ({
        name: <Author name={h.name} email={" "} />,
        gst: <Job title={h.GST} />,
        address: <p>{h.address}</p>,
        // address: (
        //   <MDBox ml={-1}>
        //     {u.isActive ? (
        //       <MDBadge
        //         badgeContent="active"
        //         color="success"
        //         variant="gradient"
        //         size="sm"
        //       />
        //     ) : (
        //       <MDBadge
        //         badgeContent="inactive"
        //         color="error"
        //         variant="gradient"
        //         size="sm"
        //       />
        //     )}
        //   </MDBox>
        // ),
        view: (
          // <MDTypography
          //   component="button"
          //   variant="caption"
          //   color="text"
          //   fontWeight="medium"
          //   onClick={() => navigate("/hospitals/" + h._id)}
          // >
          //   View
          // </MDTypography>
          <MDButton onClick={() => navigate("/hospitals/" + h._id)}>
            view
          </MDButton>
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

    dispatch(getHospitals());
  }, [dispatch, error]);

  if (hospitals) {
    const { columns, rows } = Data();
    // console.log(users);
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
        <MDBox mb={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon="leaderboard"
                    title="Hospitals Count  "
                    count={hospitals.length}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+3%",
                    //   label: "than last month",
                    // }}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>

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
                    Hospitals
                  </MDTypography>

                  <MDButton onClick={() => navigate("/hospitals/create")}>
                    Create Hospitals
                  </MDButton>
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

export default HospitalTable;
