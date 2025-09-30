const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controller/productController'); 
const { getCategories } = require('../controller/categrioes');

const { protect } = require('../MiddleWare/authMiddlware');
const { adminOnly } = require('../MiddleWare/adminMiddleware');
const upload=require('../MiddleWare/uploadMiddleware')

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly,upload.single("image"), createProduct);
router.put('/:id', protect, adminOnly,upload.single("image"), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.get('/category', getCategories);

module.exports = router;
