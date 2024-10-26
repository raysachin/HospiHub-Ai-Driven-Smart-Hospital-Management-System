const express = require("express");
const {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointment.controllers");
const {
  isAdminAuthenticated,
  isPatientAuthenticated,
} = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);  // Done

router.get("/getall", isAdminAuthenticated, getAllAppointments);  // Done


router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);  // Done


router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);  // Done

module.exports = router;
