const express=require('express');
const router=express.Router();
const rozarpay=require("../utils/razorpay");

router.post( "/create-order", async(req,res) =>{
  try{
      const{amount}=req.body;
      const options={
         amount:amount*100,
         currency:"INR",
          receipt: "receipt_" + Date.now()
      };
      const order=await rozarpay.orders.create(options);
      res.status(200).json(order);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
} );
module.exports=router;