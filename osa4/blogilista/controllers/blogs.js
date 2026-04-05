const router = require('express').Router();
module.exports = router;

const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

router.post('/', async (req, res) => {
  const { title, url, author, likes } = req.body || {};

  const blog = await Blog.create({ title, url, author, likes });
  return res.status(201).json(blog);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await Blog.findByIdAndDelete(id);
  if (!result) return res.status(404).end();

  return res.status(204).end();
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { url, likes } = req.body || {};

  // tuki tällä hetkellä vain tykkäysten ja url päivitykselle
  // tyrmää pyyntö vain jos payload ei sisällä jotain niistä
  if (likes === undefined && url === undefined) return res.status(400).end();

  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).end();

  // päivitä vain ne kentät, jotka on annettu payloadissa
  likes && (blog.likes = likes);
  url && (blog.url = url);

  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
});
