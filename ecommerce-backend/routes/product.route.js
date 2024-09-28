const express = require('express');
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const router = express.Router();

router.get("/",getAllProduct);
router.get("/:id",getProduct);
router.post("/new",createProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);

module.exports = router;