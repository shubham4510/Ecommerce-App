const express = require('express')
const router = express.Router()
const {addProduct, removeProductById, getProductById, getAllProducts} = require('../controller/product.controller')
const upload = require('../middleware/multer')

router.post('/add',upload.single("image"),addProduct)
router.delete('/delete/:id',removeProductById)
router.get('/get/:id',getProductById)
router.get('/all',getAllProducts)

module.exports = router;