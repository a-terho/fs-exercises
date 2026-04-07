const router = require('express').Router();
module.exports = router;

const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate({
    path: 'user',
    select: 'username name', // täytä vain oleelliset kentät
  });
  return res.status(200).json(blogs);
});

router.post('/', async (req, res) => {
  const { title, url, author, likes } = req.body || {};
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      error: "unauthorized: user associated with request isn't valid",
    });
  }

  const blog = await Blog.create({
    title,
    url,
    author,
    likes,
    user: user._id,
  });

  // lisää blogi myös käyttäjän tietoihin
  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  return res.status(201).json(blog);
});

router.delete('/:id', async (req, res) => {
  const blogId = req.params.id;
  const user = req.user;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res
      .status(404)
      .json({ error: `blog with id ${blogId} doesn't exist` });
  }

  // tarkista, että mikäli blogille on asetettu käyttäjä, poisto on
  //  sallittu vain jos autentikoitu käyttäjä on kyseinen käyttäjä
  // jos blogilla ei ole käyttäjää, sen voi poistaa kuka vain
  const creatorUserId = blog.user?.toString();
  if (creatorUserId !== undefined && creatorUserId !== user?.id) {
    return res
      .status(401)
      .json({ error: 'unauthorized: blog was created by different user' });
  }

  // poista blogi tietokannasta ja samoin myös sen luoneen käyttäjän tiedoista
  // oletus on, että luoja = pyynnön tehnyt käyttäjä, joten tätä voisi yksinkertaistaa
  await Blog.findByIdAndDelete(blogId);
  if (creatorUserId) {
    const creator = await User.findById(creatorUserId);
    if (creator) {
      creator.blogs = creator.blogs.filter(
        (blog) => blog.toString() !== blogId,
      );
      await creator.save();
    }
  }
  return res.status(204).end();
});

router.patch('/:id', async (req, res) => {
  const blogId = req.params.id;
  const { url, likes } = req.body || {};

  // tuki tällä hetkellä vain tykkäysten ja url päivitykselle
  // tyrmää pyyntö vain jos payload ei sisällä jotain niistä
  if (likes === undefined && url === undefined) return res.status(400).end();

  const blog = await Blog.findById(blogId);
  if (!blog)
    return res
      .status(404)
      .json({ error: `blog with id ${blogId} doesn't exist` });

  // päivitä vain ne kentät, jotka on annettu payloadissa
  likes && (blog.likes = likes);
  url && (blog.url = url);

  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
});
