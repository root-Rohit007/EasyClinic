const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const Appointment = require("../models/appointmetModel");
const Patient = require("../models/patientModels");
const User = require("../models/userModel");

// Register appointment
exports.registerAppointment = catchAsyncErrors(async (req, res, next) => {
  console.log("register appointment : ", req.body);

  const {
    creatorID,
    hospitalID,
    patientID,
    doctorID,
    date,
    doctorName,
    patientName,
    currentHeight,
    currentWeight,
    temp,
    spo2,
    bp,
    Status,
  } = req.body;

  if (doctorID === "") {
    return next(new ErrorHander(`Please select valid doctor`));
  }

  const appointment = await Appointment.create({
    creatorID,
    hospitalID,
    patientID,
    doctorID,
    date,
    doctorName,
    patientName,
    currentHeight,
    currentWeight,
    temp,
    spo2,
    bp,
    Status,
  });

  res.status(201).json({
    success: true,
    appointment,
  });
});

// Update appointment
exports.updateAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    creatorID,
    hospitalID,
    patientID,
    doctorID,
    date,
    currentHeight,
    currentWeight,
    temp,
    spo2,
    bp,
    Status,
  } = req.body;

  const newData = {
    creatorID,
    hospitalID,
    patientID,
    doctorID,
    date,
    currentHeight,
    currentWeight,
    temp,
    spo2,
    bp,
    Status,
  };

  const id = req.params.id;

  const appointment = await Appointment.findByIdAndUpdate(id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    appointment,
  });
});

// update
exports.update = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const appointment = await Appointment.findByIdAndUpdate(id, data);
  res.status(200).json({
    success: true,
    appointment,
  });
});

// getAppointmentBYID
exports.getAppointment = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHander(`No appointments exists : ${id}`));
  }
  res.status(200).json({
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
    let appointments = await Appointment.find({
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

    // appointments.map(async (d) => {
    //   const patient = await Patient.find({ _id: d.patientID });
    //   return {
    //     d,
    //     patient,
    //   };
    // });
    // // .then((resp) => console.log(resp));

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
