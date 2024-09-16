const {User} = require("../models/user.models.js");
const {ErrorHandler} = require("../middlewares/error.middlewares.js");
const {generateToken} = require("../utils/jwtToken.utils.js");
const cloudinary = require("cloudinary").v2;

// Register new patient
exports.patientRegister = async (req, res, next) => {
  try {
    console.log("Registration Began");
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email});
    console.log("IS REGISTER: ", isRegistered);
    if (isRegistered) {
      return res.status(400)
      .json({
        success: false,
        message: "User already in Register",
      })
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Patient",
    });

    generateToken(user, "User Registered!", 200, res);

    // res.status(200)
    // .json({
    //   success: true,
    //   message: "Registration Successfull",
    //   user,

    // })
  } catch (error) {
    console.log("Error in registering Patient", error);
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler("Password & Confirm Password Do Not Match!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    if (role !== user.role) {
      return next(new ErrorHandler("User Not Found With This Role!", 400));
    }

    generateToken(user, "Login Successfully!", 201, res);
  } catch (error) {
    next(error);
  }
};

// Add new admin
exports.addNewAdmin = async (req, res, next) => {
  try {
    
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    

    

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
    }

    console.log("Adding New Admin");

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Admin",
    });

    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  } catch (error) {
    res.status(500)
    .json({
      success: false,
      message: "Error Occured While Creating Admin",
      error: error.message

    })
  }
};

// Add new doctor
exports.addNewDoctor = async (req, res, next) => {
  try {
    // Check if a file is provided
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    // Validate file format
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    // Extract data from request body
    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment || !docAvatar) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    // Check if the email is already registered
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Doctor With This Email Already Exists!", 400));
    }

    // Upload to Cloudinary, specifying the folder
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath, {
      folder: "HospiHub", // Custom folder for Doctor avatars
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
      return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
    }

    // Create a new doctor
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  } catch (error) {
    console.log("Error in Registering a new Doctors");

  }
};


// Get all doctors
exports.getAllDoctors = async (req, res, next) => {
  console.log("Getting All Doctors");
  try {
    const doctors = await User.find({ role: "Doctor" });
    

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500)
    .json({
      success: false,
      message: "Failed to get all doctors",

    })
  }
};

// Get user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Logout for admin
exports.logoutAdmin = async (req, res, next) => {
  try {
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Admin Logged Out Successfully.",
      });
  } catch (error) {
    next(error);
  }
};

// Logout for patient
exports.logoutPatient = async (req, res, next) => {
  try {
    res
      .status(201)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Patient Logged Out Successfully.",
      });
  } catch (error) {
    next(error);
  }
};
