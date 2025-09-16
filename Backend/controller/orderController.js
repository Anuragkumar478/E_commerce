const Order=require('../Model/Order')
const Cart=require('../Model/Cart')

exports.placeOrder=async (req,res)=>{
    try{
       const userId=req.user._id||req.user.id;
       const{shippingAddress}=req.body;
       const cart=await Cart.findOne({user:userId}).populate("items.product")
       if(!cart||cart.items.length==0){
        return res.status(400).json({message:"cart is empty "});
       }
       const totalAmount=cart.items.reduce(
        (acc,item)=>acc+item.product.price*item.quantity,
        0
       );
       const newOrder=new Order({
        user:userId,
        items:cart.items.map (item=> ({
            product:item.product._id,
            quantity:item.quantity
        })),
        totalAmount,
        shippingAddress

       })
       await newOrder.save();
       cart.items=[];
       await cart.save();

res.status(200).json({message:"order palced succesfully ",order:newOrder})
    }
    catch(err){
res.status(500).json({error:"filed to palce order",details:err.message})
    }
}

exports.getUserOrder = async (req, res) => {
  try {
    
    const order = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product");
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "unable to fetch order " });
  }
};
