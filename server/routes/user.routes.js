const express = require("express");
const {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} = require("../controllers/user.controllers");
const {
  isAdminAuthenticated,
  isPatientAuthenticated,
} = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/patient/register", patientRegister); // Done

router.post("/login", login); // Done

// router.post("/admin", addNewAdmin); // Done

router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin); // Done


router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);  // Done


router.get("/doctors", getAllDoctors); // Done
// router.get("/doctors", async (req, res) =>{
//   try {
//     res.status(200)
//     .json({
//       success: true,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false
//     })
    
//   }
// })


router.get("/patient/me", isPatientAuthenticated, getUserDetails);  // Done


router.get("/admin/me", isAdminAuthenticated, getUserDetails); // Done


router.get("/patient/logout", isPatientAuthenticated, logoutPatient); // Done

router.get("/admin/logout", isAdminAuthenticated, logoutAdmin); // Done

module.exports = router;
