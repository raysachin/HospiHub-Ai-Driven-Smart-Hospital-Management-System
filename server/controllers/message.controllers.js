const { Message } = require("../models/message.models.js");
const ErrorHandler = require("../middlewares/error.middlewares.js");

// Send Message
exports.sendMessage = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    
    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !phone || !message) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    

    // Create a new message in the database
    await Message.create({ firstName, lastName, email, phone, message });

    console.log("Sending Message");

    // Success response
    res.status(200).json({
      success: true,
      message: "Message Sent!",
    });
  } catch (error) {
    // Catch and handle any errors
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// Get All Messages
exports.getAllMessages = async (req, res, next) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    // Success response with the list of messages
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    // Catch and handle any errors
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
};
