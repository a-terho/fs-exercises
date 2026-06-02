const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/config.js');

const router = require('express').Router();
module.exports = router;

const { User } = require('../models');

router.post('/', async (req, res) => {
  const { username, password } = req.body || {};

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = password === 'secret';

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'wrong credentials' });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return res.status(200).json({
    token,
    username: user.username,
  });
});
