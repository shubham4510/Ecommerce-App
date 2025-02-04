require('dotenv').config()
const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signupUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const checkUserIfAlreadyExist = await User.findOne({email})
        if(checkUserIfAlreadyExist){
            return res.status(401).json({
                success:false,
                message:'User already registered'
            })
        }

        const hashPassword =  bcrypt.hashSync(password,10);
        req.newUser = {
            name,
            password:hashPassword
        }
        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
        })

        return res.status(200).json({
            success:true,
            message:"Sign up successfully",
            user:{
                name:newUser.name,
                email:newUser.email
            }
        })
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to signup please try again",
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find user in DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate token
        const token = jwt.sign({ id: user._id, userName: user.name ,role:user.role}, process.env.SECRET, { expiresIn: "1d" });

        return res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // ✅ 1 day expiration
        }).status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to login, please try again",
            error: error.message
        });
    }
};


const getUser = (req, res) => {
    const token = req.cookies.token; // ✅ Get token from cookies

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return res.status(200).json({
            success: true,
            user: {
                id: decoded.id,
                name: decoded.name,
            }
        });
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};



module.exports = {
    signupUser,
    loginUser,
    getUser,
}