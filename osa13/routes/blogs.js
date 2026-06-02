const router = require('express').Router();
module.exports = router;

const { userExtractor } = require('../util/middleware.js');
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name'],
    },
    attributes: { exclude: ['userId'] },
  });
  return res.status(200).json(blogs);
});

router.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body || {};
  const userId = req.userId;

  const blog = await Blog.create({ title, author, url, likes, userId });
  return res.status(201).json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (req.blog !== null) {
    return next();
  } else {
    return res.status(404).end();
  }
};

router.delete('/:id', userExtractor, blogFinder, async (req, res) => {
  if (req.blog.userId !== req.userId) {
    return res
      .status(401)
      .json({ error: 'only the blog creator can delete their blog' });
  }

  await req.blog.destroy();
  return res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
  const { likes } = req.body || {};
  if (!isFinite(likes)) {
    return res.status(400).json({ error: 'likes must be a number value' });
  }

  req.blog.likes = Number(likes);
  await req.blog.save();
  return res.status(200).json(req.blog);
});
