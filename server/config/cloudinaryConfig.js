const cloudinary = require('cloudinary').v2

// Load environment variables from .env file
require('dotenv').config();


const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log('Cloudinary configuration successful');
    } catch (error) {
        console.error('Error configuring Cloudinary:', error);
    }
};



module.exports = connectCloudinary