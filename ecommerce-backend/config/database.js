const mongoose = require("mongoose");

const connectDB = async (DB_URL)=>{
    try {
    await mongoose.connect(DB_URL);
    console.log(`DB connected successfully`);
    } catch (error) {
        console.log(`DB connection error`,error);
        process.exit(1);
    }
}

module.exports = connectDB;