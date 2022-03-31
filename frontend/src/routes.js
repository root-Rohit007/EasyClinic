/** 
 
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Patients from "./layouts/patients";
// import Billing from "./layouts/billing";
// import Notifications from "./layouts/notifications";
import Profile from "./layouts/profile";
import Hospitals from "layouts/Hospitals/hospital";
import HospitalAdmin from "layouts/HospitalAdminDetails/hospitalAdmin";
import UserDetails from "layouts/user_profiles";
import PatientDetails from "layouts/patient_profiles";
import Signup from "layouts/create_user/create_user";
import CreateHospitals from "layouts/create_hospital/create_hospital";
import UpdateUser from "layouts/update_user/updateUser";
import UpdateAdmin from "layouts/update_admin_profile/updateAdmin";
import UpdateHospital from "layouts/update_hospital/updateHospital";
import PatientsAppointments from "layouts/appointments_patient/patients_appointments";
import UpdatePatients from "layouts/update_patients/update_patient";
// import SignIn from "./layouts/authentication/sign-in";
// import SignUp from "./layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import HospitalDetails from "layouts/Hospital_Details/hospital_details";
import Patientsform from "layouts/create_patients/createPatients";
import Appointment from "layouts/appointments/appointment";
import All_appointmets from "layouts/all_appointments/all_appointments";
import AppointmentDetails from "layouts/AppointmentView/apppointmentView";
import AppointmentUpdate from "layouts/AppointmentEdit/appointmentEdit";
import Prescription from "layouts/Prescription/prescription";
import Pdf from "layouts/Prescription/prescriptionpdf";

export const routesSuperAdmin = [
  {
    type: "collapse",
    name: "Hospitals",
    key: "Hospitals",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hospitals",
    component: <Hospitals />,
  },
  {
    name: "Hospital details",
    key: "hospital_details",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hospitals/:id",
    component: <HospitalDetails />,
  },
  {
    name: "Hospital details",
    key: "hospital_details",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hospitals/:id/update",
    component: <UpdateHospital />,
  },
  {
    name: "Create Hospital",
    key: "create_hospital",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/hospitals/create",
    component: <CreateHospitals />,
  },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },

  // {
  //   type: "collapse",
  //   name: "All Users",
  //   key: "all_users",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/allusers",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },

  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },

  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export const routesAdmin = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile/update",
    component: <UpdateAdmin />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "allusers",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/allusers",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Patients",
    key: "patients",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/patients",
    component: <Patients />,
  },
  {
    name: "Patients",
    key: "patients",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/patients/create",
    component: <Patientsform />,
  },
  {
    name: "user details",
    key: "user_details",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/allusers/:id",
    component: <UserDetails />,
  },
  {
    name: "patient details",
    key: "patient_details",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id",
    component: <PatientDetails />,
  },
  {
    name: "appointments",
    key: "appointments",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment",
    component: <Appointment />,
  },
  {
    name: "Appointment History",
    key: "appointment_history",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment_details",
    component: <PatientsAppointments />,
  },
  {
    name: "Appointment",
    key: "appointment",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment_details/:appointmentid",
    component: <AppointmentDetails />,
  },
  {
    name: "Appointment update",
    key: "appointment_update",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment_details/:appointmentid/update",
    component: <AppointmentUpdate />,
  },
  {
    name: "Prescription",
    key: "prescription",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment_details/:appointmentid/prescription",
    component: <Prescription />,
  },
  {
    name: "Prescription pdf",
    key: "prescription_pdf",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment_details/:appointmentid/prescription/pdf",
    component: <Pdf />,
  },
  {
    name: "Update Patients",
    key: "update",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/update",
    component: <UpdatePatients />,
  },
  {
    name: "create user",
    key: "create_user",
    route: "allusers/createuser",
    icon: <Icon fontSize="small">table_view</Icon>,
    component: <Signup />,
  },
  {
    name: "update user",
    key: "update_user",
    route: "allusers/:id/update",
    icon: <Icon fontSize="small">table_view</Icon>,
    component: <UpdateUser />,
  },
  {
    type: "collapse",
    name: "Appointmnets",
    key: "all_appointments",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/all_appointments",
    component: <All_appointmets />,
  },

  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },

  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },

  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export const receptionistRoutes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Appointmnets",
    key: "all_appointments",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/all_appointments",
    component: <All_appointmets />,
  },
  {
    name: "appointments",
    key: "appointments",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment",
    component: <Appointment />,
  },
  {
    name: "Appointment History",
    key: "appointment_history",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id/appointment_details",
    component: <PatientsAppointments />,
  },
  {
    type: "collapse",
    name: "Patients",
    key: "patients",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/patients",
    component: <Patients />,
  },
  {
    name: "patient details",
    key: "patient_details",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/patients/:id",
    component: <PatientDetails />,
  },
];
