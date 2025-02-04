const express = require('express');
const connectDB = require('./config/DBconnection')
const connectCloudinary = require('./config/cloudinaryConfig')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const productRouter = require('./view/product.view.js')
const userRouter = require('./view/user.view.js')
const orderRouter = require('./view/order.view.js')

const app = express();
const PORT = Number(process.env.PORT) || 5000

//MONGODB CONNECTION
connectDB();

//CONNECT CLOUDINARY
connectCloudinary();


//MIDDLEWARE
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({ extended: true ,limit:'10mb'}));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // React app's URL
    credentials: true,
}));


//ROUTES
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)
app.use('/api/order',orderRouter)

//STARTING SERVER
app.listen(PORT,()=>{
    console.log(`Server is starting at PORT: ${PORT}`)
})