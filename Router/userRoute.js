const express=require('express')
const router=express.Router();
const {registUser,loginUser,getProfile,updateProfile}=require('../controller/userController');
const {protect}=require('../MiddleWare/authMiddlware');

router.post('/register',registUser);
router.post('/login',loginUser);
router.get('/profile',protect ,getProfile);
router.put('/profile',protect,updateProfile);

module.exports=router;