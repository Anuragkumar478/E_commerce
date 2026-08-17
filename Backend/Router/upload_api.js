const express = require("express");
const router = express.Router();
const upload = require("../MiddleWare/upload");
const Product = require("../Model/Product");

router.post("/add-product", upload.single("image"), async (req, res) => {
  try {

    const{
      name,
      description,
      price,
      countInStock,
      category
    }=req.body;

    if(!name || !price){
      return res.status(400).json({ message: "Name and price are required" });
    }

    const product = new Product({
      name: name,
      description: description,
      price: Number(price),
      image: req.file ? req.file.path : "",
      countInStock: Number(countInStock) || 0,
      category: category
 
    });

console.log(product);
    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;