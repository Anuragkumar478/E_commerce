const order=require('../Model/Order')

exports.getAllOrders=async (req,res)=>{
    try{
        const orders=await order.find().populate('user','name email').populate('items.product');
        res.json(orders);
    }
    catch(err){
        res.status(500).json({error:"unable to fetch orders"});
    }
}
// ✅ Update order shipping status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status; // e.g., "processing", "shipped", "delivered", etc.
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order status", details: err.message });
  }
};
// ✅ Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body; // e.g., "Paid", "Pending", "Failed"

    const order = await order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = paymentStatus;
    await order.save();

    res.json({ message: "Payment status updated", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to update payment status", details: err.message });
  }
};