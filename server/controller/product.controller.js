const Product = require('../model/product.model');
const cloudinary = require('cloudinary').v2
const fs = require('fs/promises'); // Use Node.js promises API for file operations


exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller = false } = req.body;

        // Ensure category & subCategory are not "undefined"
        if (!name || !description || !price || !category || !subCategory || !req.file) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        // Ensure `sizes` is an array (handle case when it's sent as a string)
        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]");


        const imageFilePath = req.file.path;

        // Ensure sizes is an array

    if (!name || !description || !price || !category || !subCategory || !imageFilePath || !sizes.length) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }


        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFilePath, {
            resource_type: 'auto',
            folder: 'Products',
        });

        // Delete local file after upload
        await fs.unlink(imageFilePath);

        // Create a new product
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            subCategory,
            sizes, 
            bestseller: bestseller || false, // Default bestseller value
            image: imageUpload.secure_url, // Store Cloudinary image URL
            publicId: imageUpload.public_id, // Optional: Store public ID
        });

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to create product. Please try again!',
            error: error.message,
        });
    }
};


exports.removeProductById = async(req , res) => {
    try {
        const {id} = req.params

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"Product removed successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to remove product, Please try again!"
        })
    }
}

exports.getProductById = async(req , res) => {
    try {
        const {id} = req.params

        const product = await Product.findById(id)

        return res.status(200).json({
            success:true,
            message:"Here is your product",
            product
        })
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to get product, Please try again!"
        })
    }
}

exports.getAllProducts = async(req , res) => {
    try {
        const allProducts = await Product.find({})

        return res.status(200).json({
            success:true,
            message:"All products listed here",
            products:allProducts
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to get product, Please try again!"
        })
    }
}

