const express = require("express");
const router = express.Router();

const {
  registerAppointment,
  getAllappointments_by_PatientsID,
  getAllappointments_by_DoctorsID,
  getAllappointments_by_HospitalID,
  getAllappointments_today_doc,
  getAllappointments_today_hos,
  getAppointment,
  updateAppointment,
  update,
} = require("../controllers/appointmentController");
const { isAuthenticatedUser } = require("../middleware/auth");

// Reg
router
  .route("/registerAppointment")
  .post(isAuthenticatedUser, registerAppointment);

// update
router.route("/updateAppointment/:id").put(isAuthenticatedUser, update);

router.route("/update/:id").put(isAuthenticatedUser, update);

// get appointmentbyid
router
  .route("/getAppointmentByID/:id")
  .get(isAuthenticatedUser, getAppointment);

// Doc Dash
router
  .route("/getTodaysAppointmentsDoc/:id")
  .get(isAuthenticatedUser, getAllappointments_today_doc);

// Res Dash
router
  .route("/getTodaysAppointmentsHos/:id")
  .get(isAuthenticatedUser, getAllappointments_today_hos);

// patinet
router
  .route("/getPatientsAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_PatientsID);

// doc
router
  .route("/getDoctorsAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_DoctorsID);

// Receptionist
router
  .route("/getHospitalAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_HospitalID);

module.exports = router;
