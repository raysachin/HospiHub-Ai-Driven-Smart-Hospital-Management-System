const { User } = require("../models/user.models.js");
const {ErrorHandler} = require("../middlewares/error.middlewares.js");
const jwt = require("jsonwebtoken");

// Middleware to authenticate dashboard users
exports.isAdminAuthenticated = async (req, res, next) => {
  
  try {
    
    
    const token = req.cookies.adminToken;
    
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("DECODED ", decoded.id);
    const id = decoded.id;

    console.log("USER ", User);
    
    try {
      req.user = await User.findById(id);
      console.log("User found:", req.user); // Log user
    } catch (err) {
      console.log("Error finding user:", err.message); // Log the error
      return next(new ErrorHandler("Database error occurred", 500));
    }

    
    
    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }
    

    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  } catch (error) {
    console.log("Error in Authentication");
    // return next(new ErrorHandler(error.message, 500));
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",

    })
  }
};

// Middleware to authenticate frontend users
exports.isPatientAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Middleware to check for specific roles
exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `${req.user.role} not allowed to access this resource!`, 403
          )
        );
      }
      next();
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
};
