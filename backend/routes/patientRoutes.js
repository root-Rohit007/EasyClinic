const express = require("express");
const router = express.Router();

const {
  registerPatient,
  getPatients,
  getPatientbyID,
  updatePatient,
  deletePatients,
  getPatientsbyphone,
} = require("../controllers/patientsController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/createpatient").post(isAuthenticatedUser, registerPatient);
router.route("/getpatients").post(isAuthenticatedUser, getPatients);
router
  .route("/getpatientsByPhone")
  .post(isAuthenticatedUser, getPatientsbyphone);
router.route("/patient/:id").put(isAuthenticatedUser, updatePatient);
router.route("/patient/:id").get(isAuthenticatedUser, getPatientbyID);
router.route("/patient/:id").delete(isAuthenticatedUser, deletePatients);

module.exports = router;
