const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateProfile,
  getAllDoctors,
} = require("../controllers/userController");

const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/getAllDoctors/:id").get(isAuthenticatedUser, getAllDoctors);

router
  .route("/admin/users")
  .post(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProfile)
  // .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
module.exports = router;
