const express = require("express");
const router = express.Router();

const {
  registerAppointment,
  getAllappointments_by_PatientsID,
  getAllappointments_by_DoctorsID,
  getAllappointments_by_HospitalID,
  getAllappointments_today_doc,
  getAllappointments_today_hos,
} = require("../controllers/appointmentController");
const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/registerAppointment")
  .post(isAuthenticatedUser, registerAppointment);

router
  .route("/getTodaysAppointmentsDoc/:id")
  .get(isAuthenticatedUser, getAllappointments_today_doc);

router
  .route("/getTodaysAppointmentsHos/:id")
  .get(isAuthenticatedUser, getAllappointments_today_hos);

router
  .route("/getPatientsAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_PatientsID);

router
  .route("/getDoctorsAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_DoctorsID);

router
  .route("/getHospitalAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_HospitalID);

module.exports = router;
