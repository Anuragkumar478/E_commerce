const Order = require("../Model/Order");
const Cart = require("../Model/Cart");
const { getIO } = require("../socket");  // import socket instance
const sendEmail=require("../utils/sendAdminEmail"); // utility function for email sending
const User = require("../Model/User");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { shippingAddress } =   req.body;
  
    // console.log("shippingAddress:", shippingAddress);
//  console.log(req.body);
    const cart = await Cart.findOne({ user: userId })
    .populate("items.product")
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id|| item.product.id,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress,
      status: "pending",
      paymentStatus: "Pending",
    });

    await newOrder.save();
//  console.log("New order created:", newOrder);  
    // Empty cart
    cart.items = [];
    await cart.save();

    // 🔔 Send real-time notification to admin dashboard
    const io = getIO();
    io.emit("newOrder", {
      message: "New order placed",
      orderId: newOrder._id,
      totalAmount,
      userId,
    });

    // 📧 Send email notification to admin
   const fullOrder = await Order.findById(newOrder._id)
   .populate("items.product")
   .populate("user");
await sendEmail(fullOrder);

    res
      .status(200)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({
      error: "Failed to place order",
      details: err.message,
    });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product");
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch order" });
  }
};
