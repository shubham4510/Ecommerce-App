const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("ERROR while DB connection:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
