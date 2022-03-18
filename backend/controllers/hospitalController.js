const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const Hospital = require("../models/hospitalModel");
const userModel = require("../models/userModel");

exports.createHospitals = catchAsyncErrors(async (req, res, next) => {
  const { name, address, GST, desclaimer, termsAndConditions, admin } =
    req.body;

  const hospital = await Hospital.create({
    name,
    address,
    GST,
    desclaimer,
    termsAndConditions,
    admin,
  });

  res.status(200).json({
    success: true,
    hospital,
  });
});

exports.getHospitals = catchAsyncErrors(async (req, res, next) => {
  const hospitals = await Hospital.find();

  res.status(200).json({
    success: true,
    hospitals,
  });
});

// Get hospital by id
exports.getHospitalbyID = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const hospital = await Hospital.findById(id);

  if (!hospital) {
    return next(new ErrorHander(`Hospital dosent exists any more`));
  }

  res.status(200).json({
    success: true,
    hospital,
  });
});

exports.getHospitalAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await userModel.findById(req.params.id);

  if (!admin) {
    return next(new ErrorHander(`No admin exists: ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    admin,
  });
});

exports.updateHospital = catchAsyncErrors(async (req, res, next) => {
  const { name, address, GST, desclaimer, termsAndConditions, admin } =
    req.body;

  const newData = {
    name,
    address,
    GST,
    desclaimer,
    termsAndConditions,
    admin,
  };

  const hospital = await Hospital.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    hospital,
  });
});
