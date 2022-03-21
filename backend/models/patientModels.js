const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema({
  salutation: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  age: {
    type: Number,
    required: true,
  },

  bloodGroup: {
    type: String,
    enum: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  },

  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  hospitalID: {
    type: String,
    required: true,
  },
  creatorID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
