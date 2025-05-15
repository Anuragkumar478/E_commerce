const express=require('express')
const router=express.Router();
const {placeOrder, getUserOrder}=require('../controller/orderController')
const {protect}=require('../MiddleWare/authMiddlware');

router.post('/place' ,protect, placeOrder);
router.get('/myorder',protect,getUserOrder);

module.exports=router;