const Product = require("../models/product.model");
const { trace } = require("../routes/product.route");

const createProduct = async (req,res)=>{
    try {
        const {name,description,price,category,inStock,image,reviews,status} = req.body;

        if(!name || !description || !price || !category || !inStock || !image || !status){
            res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            inStock,
            image,
            reviews,
            status
        });

        if(product){
            res.status(201).json({
                success:true,
                message:"Product created successfully",
            })
        }else{
            res.status(500).json({
                success:false,
                message:"Error occured while creating the product",
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured while creating the product",
            error:error.message
        })
    }
}

const getProduct = async (req,res)=>{
    try {
        const productId = req.params.id;
            const product = await Product.findById(productId);
            
            if(!product){
            res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        res.status(200).json({
            success:true,
            message:"Product found",
            product
        })
        }
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured while finding the product",
            error:error.message
        })
    }
}

const updateProduct = async (req,res) => {
    try {
        const { name, description, price, category, inStock, image, ratings, reviews, status } = req.body;

        // Check if all required fields are provided
        if (!name || !description || !price || !category || !inStock || !image || !status) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Update the product by ID
        const productId = req.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                category,
                inStock,
                image,
                ratings,
                reviews,
                status
            },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured while updating the product",
            error:error.message
        });
    }
};

const getAllProduct = async (req,res) => {
    try {
        const products = await Product.find();
        if(products.length === 0){
            res.status(403).json({
                success:false,
                message:"Products list is empty",
                error:error.message
            })
        }else{
            res.status(200).json({
                success:true,
                message:"All products list",
                products
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured while finding the products",
            error:error.message
        })
    }
}
const deleteProduct = async (req,res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            success:true,
            message:"Product deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured while deleting the product",
            error:error.message
        })
    }
}

module.exports = {createProduct,getProduct,getAllProduct,deleteProduct,updateProduct};