const router = require('express').Router();
module.exports = router;

const { User, Blog, Readinglist } = require('../models');
const { userExtractor } = require('../util/middleware.js');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body || {};

  if (!(blogId && userId)) {
    return res
      .status(400)
      .json({ error: 'missing required fields: blogId, userId' });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: `user with id ${userId} not found` });
  }

  const blog = await Blog.findByPk(blogId);
  if (!blog) {
    return res.status(404).json({ error: `blog with id ${blogId} not found` });
  }

  const entry = await Readinglist.create({ userId, blogId });

  // testi testaa user_id ja blog_id kentät vastauksesta, joita Sequelize ei
  // luo automaattisesti vaikka käytettäisiin underscored: true modelin määrityksessä
  // eli ne pitää lisätä itse...
  return res
    .status(201)
    .json({ ...entry.toJSON(), blog_id: entry.blogId, user_id: entry.userId });
});

router.put('/:id', userExtractor, async (req, res) => {
  const { read } = req.body || {};
  const entryId = req.params.id;
  const userId = req.user.id;

  if (typeof read !== 'boolean') {
    return res
      .status(400)
      .json({ error: 'read can only have values: true, false' });
  }

  const entry = await Readinglist.findByPk(entryId);
  if (!entry) {
    return res
      .status(404)
      .json({ error: `reading list entry with id ${entryId} not found` });
  }

  if (entry.userId !== userId) {
    return res.status(401).json({
      error: `only the owner (${entry.userId}) of this reading list entry can modify it`,
    });
  }

  entry.read = read;
  const updated = await entry.save();

  return res.status(200).json(updated);
});
