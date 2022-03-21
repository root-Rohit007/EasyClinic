const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log("Register user", req.body);
  const {
    salutation,
    name,
    email,
    email2,
    password,
    phone,
    phone2,
    age,
    gender,
    degree,
    photo,
    signature,
    address,
    adhar,
    pan,
    regNo,
    role,
    isActive,
    isAdmin,
    hospitalID,
  } = req.body;

  const user = await User.create({
    salutation,
    name,
    email,
    email2,
    password,
    phone,
    phone2,
    age,
    gender,
    degree,
    photo,
    signature,
    address,
    adhar,
    pan,
    regNo,
    role,
    isActive,
    isAdmin,
    hospitalID,
  });

  //   const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
  });

  // sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  console.log("apiHIT");
  console.log(req.body);
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  //   const token = user.getJWTToken();

  //   res.status(200).json({
  //     success: true,
  //     token,
  //   });

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const {
    salutation,
    name,
    email,
    email2,

    phone,
    phone2,
    age,
    gender,
    degree,
    photo,
    signature,
    address,
    adhar,
    pan,
    regNo,
    role,
    isActive,
    isAdmin,
    hospitalID,
  } = req.body;

  const newData = {
    salutation,
    name,
    email,
    email2,

    phone,
    phone2,
    age,
    gender,
    degree,
    photo,
    signature,
    address,
    adhar,
    pan,
    regNo,
    role,
    isActive,
    isAdmin,
    hospitalID,
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//get all Doctors
exports.getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const doctors = await User.find({
    role: { $in: ["Doctor"] },
    hospitalID: id,
  });

  if (!doctors) {
    return next(new ErrorHander(`No doctors available: ${hospitalID}`));
  }

  res.status(200).json({
    success: true,
    doctors,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const { hospitalID } = req.body;
  // console.log(hospitalID);
  const users = await User.find({
    role: { $in: ["Doctor", "Receptionist"] },
    hospitalID: hospitalID,
    isAdmin: { $in: [false, null] },
  });

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
// exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//   };

//   await User.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
