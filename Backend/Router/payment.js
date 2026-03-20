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

const crypto = require("crypto");
const Cart = require("../Model/Cart");
const Order = require("../Model/Order");
const sendAdminEmail = require("../utils/sendAdminEmail");
const { protect } = require("../MiddleWare/authMiddlware");

router.post("/verify-payment", protect,  async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // PAYMENT VERIFIED
    const userId = req.user?.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    const totalAmount = cart.items.reduce((acc, item) => {
      if (!item.product) return acc;
      return acc + item.product.price * item.quantity;
    }, 0);
 const {shippingAddress} = req.body; // You can replace this with actual shipping address from frontend
    const newOrder = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalAmount,
      shippingAddress,
      paymentStatus: "Online",
      status: "shipped"
    });

    await newOrder.save();

     cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(newOrder._id)
  .populate("user")
  .populate("items.product");

await sendAdminEmail(populatedOrder);

    

    res.json({ message: "Payment verified and order created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports=router;