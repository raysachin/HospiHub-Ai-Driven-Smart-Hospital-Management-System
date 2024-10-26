const express = require("express");
const {
  getAllMessages,
  sendMessage,
} = require("../controllers/message.controllers");
const { isAdminAuthenticated } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/send", sendMessage);  // Done

router.get("/getall", isAdminAuthenticated, getAllMessages);   // Done

module.exports = router;
