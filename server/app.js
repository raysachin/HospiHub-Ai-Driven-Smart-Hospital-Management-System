const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { errorMiddleware } = require("./middlewares/error.middlewares");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");
const appointmentRouter = require("./routes/appointment.routes");

const app = express();
dotenv.config({ path: "./config.env" });

// Set up CORS before other middlewares and routes
const cors = require("cors");

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// // Db se connect krenge

const db = require("./config/database.config");
db.connect();

app.use(errorMiddleware);

module.exports = app;
