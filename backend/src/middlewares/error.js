const errorMiddleware = ((error, _req, res, _next) => {
  return res.status(500).json({ error: error.message });
});

module.exports = errorMiddleware;
