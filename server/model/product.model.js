const mongoose = require('mongoose')


const productSchema =  mongoose.Schema({
            name: {
                type:String,
                required:true,
            },
            description: {
                type:String,
                required:true,
            },
            price: {
                type:Number,
                required:true,
            },
            image: {
                type:String,
                required:true,
            },
            category: {
                type: String,
                required: true,
                enum: ["Mens", "Womens", "Kids"], // Example options
            },
            subCategory: {
                type: String,
                required: true,
                enum: ["Topwear", "Bottomwear", "Winterwear"], // Example options
            },
            sizes: {
                type: [String],
                default: ["S", "M", "L", "XL"],
            },
            bestseller: {
                type:Boolean,
                default:false
            }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);
module.exports = Product