const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    hospitalID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please select doctor"],
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", appointmentSchema);
