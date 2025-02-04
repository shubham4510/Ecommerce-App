const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Username should be more than 3 character"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Please enter strong password"]
    },
    role:{
        type:String,
        required:true,
        default:"user"
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User