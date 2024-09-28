const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
    },
    description:{
        type:String,
        required:[true,"Please enter product description"],
    },
    price:{
        type:Number,
        required:[true,"Please enter product name"],
    },
    category:{
        type:[String],
        required:[true,"Please enter product category"],
        maxLength:5
    },
    inStock:{
        type:Number,
        required:true,
        default:1,
        maxLength:[10,"Exceeding stock limit"]
    },
    image:{
        type:[String],
        required:true,
    },
    reviews:{
        type:[{
            user:{
                type:String,
                required:true
            },
            comment:{
                type:String
            },
            rating:{
                type:Number,
                required:true,
                maxLength:5,
            }
        }],
    },
    status:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);