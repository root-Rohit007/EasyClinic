const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const Patient = require("../models/patientModels");

// Register patient
exports.registerPatient = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    gender,
    age,
    bloodGroup,
    bloodPre,
    height,
    weight,
    hospitalID,
  } = req.body;

  const patient = await Patient.create({
    name,
    email,
    phone,
    gender,
    age,
    bloodGroup,
    bloodPre,
    height,
    weight,
    hospitalID,
  });

  res.status(201).json({
    success: true,
    patient,
  });
});

exports.getPatients = catchAsyncErrors(async (req, res, next) => {
  const patients = await Patient.find();

  res.status(200).json({
    success: true,
    patients,
  });
});

exports.getPatientbyID = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    patient,
  });
});

exports.updatePatient = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    gender,
    age,
    bloodGroup,
    bloodPre,
    height,
    weight,
    hospitalID,
  } = req.body;

  const newData = {
    name,
    email,
    phone,
    gender,
    age,
    bloodGroup,
    bloodPre,
    height,
    weight,
    hospitalID,
  };

  const patient = await Patient.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    patient,
  });
});

exports.deletePatients = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await patient.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
