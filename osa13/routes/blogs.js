const router = require('express').Router();
module.exports = router;

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  return res.status(200).json(blogs);
});

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body || {};
  const blog = await Blog.create({ title, author, url, likes });
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

router.delete('/:id', blogFinder, async (req, res) => {
  await req.blog.destroy();
  return res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
  const { likes } = req.body || {};
  if (!isFinite(likes)) {
    throw new Error('likes must be a number value');
  }

  req.blog.likes = Number(likes);
  await req.blog.save();
  return res.status(200).json(req.blog);
});
