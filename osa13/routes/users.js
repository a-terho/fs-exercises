const bcrypt = require('bcrypt');
const router = require('express').Router();
module.exports = router;

const { Blog, User } = require('../models');

router.post('/', async (req, res) => {
  const { name, username, password } = req.body || {};

  const passwordHash = await bcrypt.hash(password ? password : 'secret', 10);
  const user = await User.create({ name, username, passwordHash });
  return res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'username'],
    include: [
      {
        model: Blog,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      },
    ],
  });
  return res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  const where = {};
  if (req.query.read) {
    where.read = req.query.read === 'true' ? true : false;
  }

  const user = await User.findByPk(userId, {
    attributes: ['name', 'username'],
    include: [
      // lukulista
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        through: {
          attributes: ['id', 'read'],
          where,
        },
      },
      // itse lisätyt blogit
      // {
      //   model: Blog,
      //   attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      // },
    ],
  });

  return res.status(200).json(user);
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
