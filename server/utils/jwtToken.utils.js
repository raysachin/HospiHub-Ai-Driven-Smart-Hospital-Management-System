

exports.generateToken = (user, message, statusCode, res) => {
  try {
    const token = user.generateJsonWebToken();

    console.log("TOKEN: ", token);

    // user = user.toObject();

    // Determine the cookie name based on the user's role
    const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
    console.log("Token Genaration Started");

    res.status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 // Expiration time from env variable
        ),
        httpOnly: true, // Restricting the access of the cookie to HTTP only
      })
      .json({
        success: true,
        message,
        user,
        token,
        cookieName
      });
  } catch (error) {
    // Handling any error that might occur
    return res.status(500).json({
      success: false,
      message: 'Token generation failed',
      error: error.message,
    });
  }
};


