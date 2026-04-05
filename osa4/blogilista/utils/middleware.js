const morgan = require('morgan');

morgan.token('body', (req, res) => JSON.stringify(req.body));
const requestLogger = () => {
  return morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    { skip: () => process.env.NODE_ENV === 'test' },
  );
};

const noEndpoint = (req, res) => {
  return res.status(404).json({ error: `no endpoint at ${req.originalUrl}` });
};

const globalErrorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message });
  }
  return next(err);
};

module.exports = { requestLogger, noEndpoint, globalErrorHandler };
