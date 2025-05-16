const express=require('express');
const router=express.Router();
const Cart =require('../Model/Cart');
const Product=require('../Model/Product');
const {protect} =require('../MiddleWare/authMiddlware');

router.post('/add',protect,async (req,res)=>{
    const userId=req.user._id;
    const {productId,quantity}=req.body;
    try{
        let cart =await Cart.findOne({user:userId});
        if(!cart){
            cart=new Cart({user:userId,items:[]});
        }
        const existingItem=   cart.items.find(item => item.product.toString()===productId)
        if(existingItem){
            existingItem.quantity+=quantity;
        }
        else{
            cart.items.push({product:productId,quantity})
        }
        await cart.save();
        res.status(200).json(cart);
    }
    catch(error){
          res.status(500).json({ error: error.message });
    }
});

// Get user cart
router.get("/", protect , async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quantity or remove item
router.put("/update", protect , async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) return res.status(404).json({ error: "Item not in cart" });

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports=router;
