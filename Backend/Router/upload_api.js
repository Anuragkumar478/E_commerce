const express = require("express");
const router = express.Router();
const upload = require("../MiddleWare/upload");
const Product = require("../Model/Product");

router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
 
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.file.path   
    });
console.log(product);
    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;