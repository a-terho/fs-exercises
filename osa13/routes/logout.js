const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config.js');

const router = require('express').Router();
module.exports = router;

const { userExtractor } = require('../util/middleware.js');
const { Session } = require('../models');

router.delete('/', userExtractor, async (req, res) => {
  const username = req.user.username;

  await Session.destroy({ where: { username } });
  return res.status(204).end();
});
