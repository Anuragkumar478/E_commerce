const express = require('express');
const router = express.Router();
const {getAllOrders,updateOrderStatus,updatePaymentStatus} = require('../controller/adminController');
const { protect } = require('../MiddleWare/authMiddlware');
const { adminOnly } = require('../MiddleWare/adminMiddleware');


router.get('/orders', protect, adminOnly, getAllOrders);
router.put('/orders/:orderId/status', protect, adminOnly, updateOrderStatus);
router.put('/orders/:orderId/payment-status', protect, adminOnly, updatePaymentStatus); 
module.exports = router;