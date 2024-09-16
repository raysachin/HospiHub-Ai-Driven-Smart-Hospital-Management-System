// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

require("dotenv").config();



// Export the cloudinary
exports.cloudinaryConnect = () =>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,

        })
    } catch (error) {
        console.log("Error in Connecting to Cloudinary", error);
        
    }
}