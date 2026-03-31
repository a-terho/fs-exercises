require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

const blogSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(process.env.MONGODB_URI, { family: 4 });

app.use(express.json());
app.use(morgan('tiny'));

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
