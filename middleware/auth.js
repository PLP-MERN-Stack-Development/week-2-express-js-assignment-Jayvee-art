exports.auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401);
    throw new Error('Unauthorized: API key missing or invalid');
  }
  next();
};
