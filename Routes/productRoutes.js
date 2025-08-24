const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} = require('../controllers/productController');
const { auth } = require('../middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validate');

// CRUD
router.route('/')
  .get(getProducts)
  .post(auth, validateCreateProduct, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(auth, validateUpdateProduct, updateProduct)
  .delete(auth, deleteProduct);

// Extra route: product stats
router.get('/stats/summary', getProductStats);

module.exports = router;
