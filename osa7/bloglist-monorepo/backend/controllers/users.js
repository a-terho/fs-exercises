const router = require('express').Router();
module.exports = router;

const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find({}).populate({
    path: 'blogs',
    select: '-user', // piilota turha id:n toisto
  });
  return res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { username, password, name } = req.body || {};

  if (password === undefined || password.length < 3)
    return res.status(400).json({
      error: 'Field `password` needs to be at least 3 characters long.',
    });

  const passwordHash = await User.generatePasswordHash(password);
  const user = await User.create({
    username,
    passwordHash,
    name,
  });

  res.status(201).json(user);
});
