const router = require('express').Router();
module.exports = router;

const Blog = require('../models/blog.js');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  return res.status(200).json(blogs);
});

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body || {};
  try {
    const blog = await Blog.create({ title, author, url, likes });
    return res.status(201).json(blog);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);
  if (blog !== null) {
    await blog.destroy();
    return res.status(200).end();
  } else {
    res.status(404).end();
  }
});
