const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/config.js');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map((e) => e.message);
    res.status(400).json({ error: messages });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid authorization token' });
  } else {
    res.status(500).end();
  }
  console.log(err);
  return next(err);
};

const userExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if (!(auth && auth.startsWith('Bearer '))) {
    return res.status(400).json({ error: 'missing authorization token' });
  }

  const decoded = jwt.verify(auth.substring(7), JWT_SECRET);
  req.userId = decoded.id;
  next();
};

module.exports = { errorHandler, userExtractor };
