const app = require("./app");
// Cloud se connect krna hai
const cloudinary = require("./config/cloudinary.config");
cloudinary.cloudinaryConnect();

// PORT find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 4000

// // server activate krni hai
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})






// const express = require("express");

// const app = express();

// // PORT find krna hai
// require("dotenv").config();
// const PORT = process.env.PORT || 4000

// // Middleware add krne hai
// app.use(express.json());
// const fileUpload = require("express-fileupload");
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));


// // Db se connect krenge

// const db = require("./config/database.config");
// db.connect();


// // Cloud se connect krna hai
// const cloudinary = require("./config/cloudinary.config");
// cloudinary.cloudinaryConnect(); 


// // Api route mount krna hai

// // Route ko import krke mount kro
// const userRoute = require("./routes/user.route");

// app.use("/api/v1/", userRoute);


// // server activate krni hai
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);

// })