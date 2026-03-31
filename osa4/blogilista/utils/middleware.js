const noEndpoint = (req, res) => {
  return res.status(404).json({ error: `no endpoint at ${req.originalUrl}` });
};

const globalErrorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
  return next(err);
};

module.exports = { noEndpoint, globalErrorHandler };
