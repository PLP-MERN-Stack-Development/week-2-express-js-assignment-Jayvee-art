exports.validateCreateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400);
    throw new Error('Name and price are required');
  }
  next();
};

exports.validateUpdateProduct = (req, res, next) => {
  const { price } = req.body;
  if (price !== undefined && price < 0) {
    res.status(400);
    throw new Error('Price must be positive');
  }
  next();
};
exports.validatePagination = (req, res, next) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 5;
  req.query.page = page;
  req.query.limit = limit;
  next();
};