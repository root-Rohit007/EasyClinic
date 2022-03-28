const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
    email2: {
      type: String,
      // unique: true,
      // validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
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
    phone2: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      // required: [true, "User phone number required"],
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    degree: {
      type: Array,
    },
    photo: {
      type: String,
    },
    signature: {
      type: String,
    },
    address: {
      type: String,
    },
    adhar: {
      type: String,
    },
    pan: {
      type: String,
    },
    // regNo: {
    //   type: String,
    //   required: true,
    // },
    role: {
      type: String,
      enum: ["SuperAdmin", "Doctor", "Receptionist"],
      default: "user",
    },
    isActive: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    adminID: {
      type: String,
    },
    hospitalID: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hashing passwords before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// Jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPass) {
  return bcrypt.compare(enteredPass, this.password);
};

module.exports = mongoose.model("User", userSchema);
