const Product = require("../Model/Product");

const searchProducts = async (req, res) => {
  const { q } = req.query;

  try {
    let searchCriteria = {};

    if (q) {
      searchCriteria = {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
        ],
      };
    }

    const products = await Product.find(searchCriteria);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { searchProducts };