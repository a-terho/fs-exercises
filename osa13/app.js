const express = require('express');
const app = express();
module.exports = app;

app.use(express.json());

const blogRouter = require('./routes/blogs.js');
app.use('/api/blogs', blogRouter);
