const router = require('express').Router();
module.exports = router;

const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

router.post('/', async (req, res) => {
  const { title, url, author, likes } = req.body;

  try {
    const blog = await Blog.create({ title, url, author, likes });
    return res.status(201).json(blog);
  } catch (err) {
    // mongoosen heittämä validointivirhe
    if (err.name === 'ValidationError') {
      return res.status(400).end();
    }
    throw err;
  }
});
