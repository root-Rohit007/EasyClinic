const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const Appointment = require("../models/appointmetModel");

// Register appointment
exports.registerAppointment = catchAsyncErrors(async (req, res, next) => {
  console.log("register appointment : ", req.body);

  const {
    hospitalID,
    patientID,
    doctorID,
    creatorID,
    date,
    doctorName,
    patientName,
  } = req.body;

  if (doctorID === "") {
    return next(new ErrorHander(`Please select valid doctor`));
  }

  const appointment = await Appointment.create({
    hospitalID,
    patientID,
    doctorID,
    creatorID,
    date,
    doctorName,
    patientName,
  });

  res.status(201).json({
    success: true,
    appointment,
  });
});

exports.getAllappointments_today_doc = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;
    let dnow = new Date();
    let dnext = new Date();
    dnext.setHours(24, 0, 0, 0);
    dnow.setHours(0, 0, 0, 0);
    // console.log(dnow, dnext);
    const appointments = await Appointment.find({
      doctorID: id,
      date: {
        $gte: dnow,
        $lt: dnext,
      },
    }).sort({ date: +1 });

    const upcomingAppointmentsCount = await Appointment.find({
      doctorID: id,
      date: {
        $gte: dnext,
      },
    }).count();

    if (!appointments) {
      return next(new ErrorHander(`no appointments exists: ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      appointments,
      appointmentsCount: appointments.length,
      upcomingAppointmentsCount,
    });
  }
);

exports.getAllappointments_today_hos = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;
    let dnow = new Date();
    let dnext = new Date();
    dnext.setHours(24, 0, 0, 0);
    dnow.setHours(0, 0, 0, 0);
    // console.log(dnow, dnext);
    const appointments = await Appointment.find({
      hospitalID: id,
      date: {
        $gte: dnow,
        $lt: dnext,
      },
    }).sort({ date: +1 });

    const upcomingAppointmentsCount = await Appointment.find({
      hospitalID: id,
      date: {
        $gte: dnext,
      },
    }).count();

    if (!appointments) {
      return next(new ErrorHander(`no appointments exists: ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      appointments,
      appointmentsCount: appointments.length,
      upcomingAppointmentsCount,
    });
  }
);

// get all appointments by doctors ID
exports.getAllappointments_by_DoctorsID = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;

    const appointments = await Appointment.find({
      doctorID: id,
    }).sort({ date: -1 });

    if (!appointments) {
      return next(new ErrorHander(`no appointments exists: ${req.params.id}`));
    }
    res.status(200).json({
      success: true,
      appointments,
    });
  }
);

//get all appointments by Hospital ID
exports.getAllappointments_by_HospitalID = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;

    const appointments = await Appointment.find({
      hospitalID: id,
    }).sort({ date: -1 });

    if (!appointments) {
      return next(new ErrorHander(`no appointments exists: ${req.params.id}`));
    }
    res.status(200).json({
      success: true,
      appointments,
    });
  }
);

// get all appointments by patient ID
exports.getAllappointments_by_PatientsID = catchAsyncErrors(
  async (req, res, next) => {
    const id = req.params.id;
    const appointments = await Appointment.find({ patientID: id }).sort({
      date: -1,
    });

    if (!appointments) {
      return next(new ErrorHander(`no appointments exists: ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      appointments,
    });
  }
);
