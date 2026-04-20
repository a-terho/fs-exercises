const config = require('../utils/config');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

morgan.token('body', (req, res) => JSON.stringify(req.body));
const addRequestLogger = () => {
  return morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    { skip: () => process.env.NODE_ENV === 'test' },
  );
};

// siirtää jwt:n headerista req-olioon
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  }
  return next();
};

// siirtää edelleen käyttäjän req-olioon
const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decoded = jwt.verify(req.token, config.JWT_SECRET);
    if (decoded.username && decoded.id) {
      req.user = await User.findById(decoded.id);
    }
  }
  return next();
};

const noEndpoint = (req, res) => {
  return res.status(404).json({ error: `no endpoint at ${req.originalUrl}` });
};

const globalErrorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else if (
    err.name === 'MongoServerError' &&
    err.message.includes('E11000 duplicate key error')
  ) {
    let username = err?.keyValue?.username;
    username = username ? ` '${username}'` : ``;
    return res.status(400).json({
      error: `User creation failed: username${username} is already taken`,
    });
  } else if (
    err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError'
  ) {
    return res.status(401).json({
      error:
        'unauthorized: request contains invalid or expired token, please login again',
    });
  } else {
    res.status(500).json({ error: err.message });
  }
  return next(err);
};

module.exports = {
  addRequestLogger,
  tokenExtractor,
  userExtractor,
  noEndpoint,
  globalErrorHandler,
};
