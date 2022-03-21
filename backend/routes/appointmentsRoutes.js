const express = require("express");
const router = express.Router();

const {
  registerAppointment,
  getAllappointments_by_PatientsID,
  getAllappointments_by_DoctorsID,
} = require("../controllers/appointmentController");
const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/registerAppointment")
  .post(isAuthenticatedUser, registerAppointment);

router
  .route("/getPatientsAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_PatientsID);

router
  .route("/getDoctorsAppointments/:id")
  .get(isAuthenticatedUser, getAllappointments_by_DoctorsID);

module.exports = router;
