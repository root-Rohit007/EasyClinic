const express = require("express");
const { getAllProducts } = require("../controllers/test");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/test").get(getAllProducts);

module.exports = router;
