const config = require('../utils/config');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
module.exports = router;

const User = require('../models/User');

router.post('/', async (req, res) => {
  const { username, password } = req.body || {};

  // liitä kyselyn palauttamaan käyttäjäolioon myös passwordHash kenttä
  const user = await User.findOne({ username }).select('+passwordHash');
  const correctPw = await user?.checkPassword(password);

  if (!(user && correctPw))
    return res.status(401).json({ error: 'invalid username or password' });

  // luo sähköisesti allekirjoitettu jwt
  const payload = { username: user.username, id: user.id };
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ token, username: user.username });
});
