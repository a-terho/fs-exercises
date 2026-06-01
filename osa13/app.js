const express = require('express');
const app = express();
module.exports = app;

const blogRouter = require('./routes/blogs.js');
const { errorHandler } = require('./util/middleware.js');

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use(errorHandler);
