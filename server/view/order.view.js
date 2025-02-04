const express = require('express')
const router = express.Router()
const {getAllOrders,addOrder,updateOrderStatus,getStatusOfOrders, getFullOrderDetails} = require('../controller/order.controller')

router.get('/get',getAllOrders);
router.get('/details/get',getFullOrderDetails);
router.get('/get/status',getStatusOfOrders);
router.put('/status',updateOrderStatus);
router.post('/add',addOrder)


module.exports = router;