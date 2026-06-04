const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config.js');

const router = require('express').Router();
module.exports = router;

const { User, Session } = require('../models');

router.post('/', async (req, res) => {
  const { username, password } = req.body || {};

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'wrong credentials' });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET);
  await Session.create({ token, username: user.username });

  return res.status(200).json({
    token,
    username: user.username,
    name: user.name,
  });
});
