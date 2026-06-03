const router = require('express').Router();
module.exports = router;

const { User, Blog, Readinglist } = require('../models');
const { userExtractor } = require('../util/middleware.js');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body || {};

  // const user = await User.findByPk(userId);
  // if (!user) {
  //   return res.status(404).json({ error: `user with id ${userId} not found` });
  // }

  // const blog = await Blog.findByPk(blogId);
  // if (!blog) {
  //   return res.status(404).json({ error: `blog with id ${blogId} not found` });
  // }

  // error handler middleware käsittelee virhetilanteet
  const entry = await Readinglist.create({ userId, blogId });

  return res.status(200).json(entry);
});

router.put('/:id', userExtractor, async (req, res) => {
  const { read } = req.body || {};
  const entryId = req.params.id;
  const userId = req.userId;

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
    return res.status(400).json({
      error: `only the owner (${entry.userId}) of this reading list entry can modify it`,
    });
  }

  entry.read = read;
  const updated = await entry.save();

  return res.status(200).json(updated);
});
