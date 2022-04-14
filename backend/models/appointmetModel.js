const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    hospitalID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hospital",
      autopopulate: true,
    },
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
      autopopulate: true,
    },
    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please select doctor"],
      ref: "User",
      autopopulate: true,
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      require: true,
    },
    currentHeight: {
      type: String,
    },
    currentWeight: {
      type: String,
    },
    temp: {
      type: String,
    },
    spo2: {
      type: String,
    },
    bp: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
    prescription: {
      type: Array,
    },
    reason: String,
    disease: String,
    lineTreatment: String,
    procedure: String,
    fees: String,
  },
  { timestamps: true }
);
appointmentSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("appointment", appointmentSchema);

// Current height
// Current weight
// Temp
// SP02
// BP
// Status [pending cancel completed]
