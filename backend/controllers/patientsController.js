const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const Patient = require("../models/patientModels");

// Register patient
exports.registerPatient = catchAsyncErrors(async (req, res, next) => {
  const {
    // casePaperNo,
    salutation,
    name,
    email,
    phone,
    phone2,
    gender,
    address,
    age,
    bloodGroup,
    height,
    weight,
    asthma,
    diabetes,
    highbp,
    kidenyStone,
    thyroid,
    arthritis,
    otherDiseases,
    hospitalID,
    creatorID,
  } = req.body;

  const countPatients = await Patient.find({
    hospitalID: hospitalID,
  }).count();
  // console.log(hospitalID);
  // console.log(countPatients);

  const patient = await Patient.create({
    casePaperNo: countPatients + 1 ,
    salutation,
    name,
    email,
    phone,
    phone2,
    gender,
    address,
    age,
    bloodGroup,
    height,
    weight,
    asthma,
    diabetes,
    highbp,
    kidenyStone,
    thyroid,
    arthritis,
    otherDiseases,
    hospitalID,
    creatorID,
  });

  res.status(201).json({
    success: true,
    patient,
  });
});

exports.getPatients = catchAsyncErrors(async (req, res, next) => {
  const { hospitalID } = req.body;
  const patients = await Patient.find({
    hospitalID: hospitalID,
  });

  res.status(200).json({
    success: true,
    patients,
  });
});

exports.getPatientsbyphone = catchAsyncErrors(async (req, res, next) => {
  const { hospitalID, phoneS } = req.body;
  const phoneRegExp = new RegExp("^" + phoneS);
  const patients = await Patient.find({
    hospitalID: hospitalID,
    phone: phoneRegExp,
  });

  res.status(200).json({
    success: true,
    patients,
  });
});

exports.getPatientbyID = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
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
    casePaperNo,
    salutation,
    name,
    email,
    phone,
    phone2,
    gender,
    address,
    age,
    bloodGroup,
    height,
    weight,
    asthma,
    diabetes,
    highbp,
    kidenyStone,
    thyroid,
    arthritis,
    otherDiseases,
    hospitalID,
    creatorID,
  } = req.body;

  const newData = {
    casePaperNo,
    salutation,
    name,
    email,
    phone,
    phone2,
    gender,
    address,
    age,
    bloodGroup,
    height,
    weight,
    asthma,
    diabetes,
    highbp,
    kidenyStone,
    thyroid,
    arthritis,
    otherDiseases,
    hospitalID,
    creatorID,
  };

  console.log("newData", newData);

  console.log("id", req.params.id);

  const patient = await Patient.findByIdAndUpdate(req.params.id, newData, {
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
