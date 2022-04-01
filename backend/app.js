const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Route imports
const product = require("./routes/testroutes");
const user = require("./routes/userRoutes");
const hospitals = require("./routes/hospitalRoutes");
const patients = require("./routes/patientRoutes");
const appointment = require("./routes/appointmentsRoutes");

app.use("/api/v1", product);
app.use("/api/v2", user);
app.use("/api/v3", hospitals);
app.use("/api/v4", patients);
app.use("/api/v5", appointment);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
