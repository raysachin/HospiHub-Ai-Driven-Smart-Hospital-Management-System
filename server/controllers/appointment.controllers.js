const { Appointment } = require("../models/appointment.models.js");
const { User } = require("../models/user.models.js");
const ErrorHandler = require("../middlewares/error.middlewares.js");

// Post a new appointment
exports.postAppointment = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address,
    } = req.body;

    // Check if all required fields are filled
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    // Check for doctor conflicts
    const isConflict = await User.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });

    if (isConflict.length === 0) {
      return next(new ErrorHandler("Doctor not found", 404));
    }

    if (isConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Doctors Conflict! Please Contact Through Email Or Phone!",
          400
        )
      );
    }

    // Create the appointment
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });

    // Success response
    res.status(200).json({
      success: true,
      appointment,
      message: "Appointment Sent!",
    });
  } catch (error) {
    // Handle any error during the process
    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve appointments",
      error: error.message,
    });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the appointment exists
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }

    // Update appointment status
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    // Success response
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the appointment exists
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }

    // Delete the appointment
    await appointment.deleteOne();

    // Success response
    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};
