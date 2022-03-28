const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    GST: {
      type: String,
      required: [true, "Enter GST"],
    },
    desclaimer: {
      type: String,
    },
    termsAndConditions: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
