require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRouter = require('./routes/product.route')
const app = express();


//Database
const connectDB = require("./config/database");

//Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


//Routes
app.get("/",()=>{
    console.log(`Server is working fine`);
})
app.use("/api/v1/product",productRouter)

const startDB = ()=>{
    try {
        connectDB(process.env.DB_URL)
        app.listen(process.env.PORT,()=>{
            console.log(`Server is listening at PORT:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startDB();