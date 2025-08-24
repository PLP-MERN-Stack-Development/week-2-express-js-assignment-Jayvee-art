const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../utils/asyncHandler');

// In-memory store
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: '128GB storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable with timer', price: 50, category: 'kitchen', inStock: false }
];

// GET all (with filtering, pagination, search)
exports.getProducts = asyncHandler(async (req, res) => {
  let results = [...products];
  const { category, search, page = 1, limit = 5 } = req.query;

  if (category) results = results.filter(p => p.category === category);
  if (search) results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + Number(limit));

  res.json({ total: results.length, page: Number(page), limit: Number(limit), products: paginated });
});

// GET by ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// POST create
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const product = { id: uuidv4(), name, description, price, category, inStock };
  products.push(product);
  res.status(201).json(product);
});

// PUT update
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  Object.assign(product, req.body);
  res.json(product);
});

// DELETE
exports.deleteProduct = asyncHandler(async (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404);
    throw new Error('Product not found');
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Deleted successfully', product: deleted[0] });
});

// Stats
exports.getProductStats = asyncHandler(async (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ total: products.length, stats });
});
