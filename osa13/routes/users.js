const router = require('express').Router();
module.exports = router;

const { User } = require('../models');

router.post('/', async (req, res) => {
  const { name, username, password } = req.body || {};
  const user = await User.create({ name, username });
  return res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

router.put('/:username', async (req, res) => {
  const username = req.params.username;
  const { name } = req.body || {};

  if (!name) {
    return res.status(400).json({ error: 'no name was given' });
  }

  const user = await User.findOne({ where: { username } });
  if (user !== null) {
    user.name = name;
    await user.save();
    return res.status(200).json(user);
  } else {
    return res.status(404).end();
  }
});
