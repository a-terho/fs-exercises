const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config.js');

const { Session, User } = require('../models');

const errorHandler = (err, req, res, next) => {
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    const messages = err.errors.map((e) => e.message);
    return res.status(400).json({ error: messages });
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(404).json({ error: err.parent.detail });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid authorization token' });
  }

  console.log(err);
  return res.status(500).end();
};

const userExtractor = async (req, res, next) => {
  const auth = req.get('Authorization');
  if (!(auth && auth.startsWith('Bearer '))) {
    return res.status(401).json({ error: 'missing authorization token' });
  }

  const token = auth.substring(7);
  const session = await Session.findOne({ where: { token } });
  if (!session || !session.valid) {
    return res
      .status(401)
      .json({ error: 'current session is not valid, log in again' });
  }

  const decoded = jwt.verify(token, SECRET);
  const user = await User.findByPk(decoded.id);

  if (!user || user.disabled) {
    return res
      .status(401)
      .json({ error: 'user associated to authorization token does not exist' });
  }

  req.user = user;
  next();
};

module.exports = { errorHandler, userExtractor };
