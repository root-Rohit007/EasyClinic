const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Route imports
const product = require("./routes/testroutes");
const user = require("./routes/userRoutes");
const hospitals = require("./routes/hospitalRoutes");
const patients = require("./routes/patientRoutes");

app.use("/api/v1", product);
app.use("/api/v2", user);
app.use("/api/v3", hospitals);
app.use("/api/v4", patients);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
